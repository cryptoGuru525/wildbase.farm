import React, { useState, useEffect } from 'react'
import { START_PRESALE } from 'config/config'
import { MdOutlineSwapHorizontalCircle } from 'react-icons/md'
import { useAccount, erc20ABI, useContractRead, useBalance } from 'wagmi'
import { ethers } from 'ethers'
import ZapperDepositModal from 'components/ZapperDepositModal'
import lpTokenAbi from 'config/abi/lpToken'
import { toFixed } from 'utils/customHelpers'
import useRefresh from 'hooks/useRefresh';
import { useEthersSigner } from 'hooks/useEthers'
import { toReadableAmount } from 'utils/customHelpers'
import { getErc20Contract } from 'utils/contractHelpers'
const farms = [
  {
    pid: 0,
    lpSymbol: 'WILDx',
    isTokenOnly: true,
    lpAddresses: '0xbCDa0bD6Cd83558DFb0EeC9153eD9C9cfa87782E',
    decimals: 18,
    logoA: '/images/tokens/wildx.svg',
    logoB: ''
  },
  {
    pid: 0,
    lpSymbol: 'ETH',
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoA: '/images/tokens/weth.svg',
    logoB: ''
  },
  {
    pid: 1,
    lpSymbol: 'WETH',
    isTokenOnly: true,
    lpAddresses: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoA: 'https://svgshare.com/getbyhash/sha1-38zdMb/7WVkaVJEus7guQuBuCSU=',
    logoB: ''
  },
  {
    pid: 1,
    lpSymbol: 'WETH-WILDX',
    isTokenOnly: false,
    lpAddresses: '0xeAA13b4f85A98E6CcaF65606361BD590e98DE2Cb',
    decimals: 18,
    logoA: '/images/tokens/wildx.svg',
    logoB: '/images/tokens/weth.svg'
  },

]

export default function Zap() {
  const [started, setStated] = useState(false)
  const { address } = useAccount()

  const [tokenA, setTokenA] = useState(farms[0])
  const [availableA, setAvailableA] = useState(0)

  const [tokenB, setTokenB] = useState(farms[1])
  const [availableB, setAvailableB] = useState(0)

  const fastRefresh = useRefresh()
  const signer = useEthersSigner()

  const tokenABI = (token) => {
    return token?.isTokenOnly ? erc20ABI : lpTokenAbi
  }

  const { data } = useBalance({
    address: address,
  })

  const getBalance = async (token, type) => {
    try {
      if (token.lpSymbol === 'ETH') {
        const balance = await signer.getBalance();
        type === 'A' ? setAvailableA(toReadableAmount(balance, token.decimals)) : setAvailableB(toReadableAmount(balance, token.decimals))
      } else {
        const tokenContract = getErc20Contract(token.lpAddresses, signer)
        const balance1 = await tokenContract.balanceOf(address);
        setAvailableA(toReadableAmount(balance1, token.decimals))
        type === 'A' ? setAvailableA(toReadableAmount(balance1, token.decimals)) : setAvailableB(toReadableAmount(balance1, token.decimals))
      }
    } catch (e) {
      type === 'A' ? setAvailableA('') : setAvailableB('')
    }
  }

  const handleChangeToken = (e, type) => {
    if (type === '1') {
      setTokenA(farms[Number(e)])
    } else {
      setTokenB(farms[Number(e)])
    }
  }

  const handleReverse = () => {
    const temp = tokenA
    setTokenA(tokenB)
    setTokenB(temp)
  }


  useEffect(() => {
    getBalance(tokenA, 'A')
    getBalance(tokenB, 'B')
  }, [tokenA, tokenB, fastRefresh])

  return (
    <div className='container'>
      <div className='presale_banner pb-16'>ZAPPER</div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pb-16'>
        <div className='flex justify-center'>
          <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
            <p className='font-semibold text-center text-xl'>Input Token</p>

            {tokenA?.isTokenOnly ? (
              <img
                src={tokenA?.logoA}
                alt='token'
                className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
              />
            ) : (
              <div className='lg:h-[90px] h-[60px] my-6 relative'>
                <img
                  src={tokenA?.logoA}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                />
                <img
                  src={tokenA?.logoB}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                />
              </div>
            )}

            <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
              <select
                name='tokenA'
                className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                onChange={(e) => handleChangeToken(e.target.value, '1')}
                value={farms.indexOf(tokenA)}
              >
                {farms.map((item, key) => {
                  return (
                    <option
                      key={key}
                      className='bg-secondary-700'
                      value={key}
                    >
                      {item?.lpSymbol}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='text-center'>
              {tokenA.lpSymbol} Available : {toFixed(availableA, 5)}
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <MdOutlineSwapHorizontalCircle
            onClick={handleReverse}
            className='text-[80px] cursor-pointer scale-100 hover:scale-105 transition ease-in-out rotate-90 md:rotate-180'
          />
        </div>

        <div className='flex justify-center'>
          <div className='w-full max-w-[400px] bg-primary p-4 rounded-lg border border-gray-600'>
            <p className='font-semibold text-center text-xl'>Input Token</p>

            {tokenB?.isTokenOnly ? (
              <img
                src={tokenB?.logoA}
                alt='token'
                className='rounded-full my-6 lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] mx-auto border-[3px] border-white'
              />
            ) : (
              <div className='lg:h-[90px] h-[60px] my-6 relative'>
                <img
                  src={tokenB?.logoA}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
                />
                <img
                  src={tokenB?.logoB}
                  alt='token'
                  className='rounded-full lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
                />
              </div>
            )}

            <div className='bg-secondary-700 rounded-full p-2 flex mb-2'>
              <select
                name='tokenB'
                className='bg-transparent focus-visible:outline-none w-full cursor-pointer'
                onChange={(e) => handleChangeToken(e.target.value, '2')}
                value={farms.indexOf(tokenB)}
              >
                {farms.map((item, key) => {
                  return (
                    <option
                      key={key}
                      className='bg-secondary-700'
                      value={key}
                    >
                      {item.lpSymbol}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='text-center'>
              {tokenB.lpSymbol} Available : {toFixed(availableB, 5)}
            </div>
          </div>
        </div>
      </div>
      <ZapperDepositModal
        tokenA={tokenA}
        tokenB={tokenB}
        availableA={availableA}
        availableB={availableB}
      />
    </div>
  )
}
