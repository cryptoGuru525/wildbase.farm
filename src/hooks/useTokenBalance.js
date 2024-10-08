import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getBep20Contract, getWILDContract, getMasterchefContract } from 'utils/contractHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from './useRefresh'
import useLastUpdated from './useLastUpdated'
import { useEthersSigner, useEthersProvider } from './useEthers'
import { useAccount, useNetwork } from 'wagmi'
import { CHAIN_ID } from 'config/config'
import { ethers } from 'ethers'
const FetchStatus = {
  NOT_FETCHED: 'not-fetched',
  SUCCESS: 'success',
  FAILED: 'failed',
}

const useTokenBalance = (tokenAddress) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { address } = useAccount()
  const { fastRefresh } = useRefresh()
  const provider = useEthersProvider()
  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, provider)
      try {
        const res = await contract.balanceOf(address)
        setBalanceState({ balance: new BigNumber(res), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (address) {
      fetchBalance()
    }
  }, [address, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  useEffect(() => {
    async function fetchTotalSupply() {
      const wildContract = getWILDContract(provider, chain ? chain.id : CHAIN_ID)
      const supply = await wildContract.totalSupply()
      setTotalSupply(ethers.utils.formatUnits(supply, 18))
    }
    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useWILDPerSecond = () => {
  const { slowRefresh } = useRefresh()
  const [wildPerSecond, setWildPerSecond] = useState(BIG_ZERO)
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  useEffect(() => {
    async function fetchWildPerSecond() {
      const masterChefContract = getMasterchefContract(provider, chain ? chain.id : CHAIN_ID)
      const perSecond = await masterChefContract.wildPerSecond()
      setWildPerSecond(ethers.utils.formatUnits(perSecond, 18))
    }

    fetchWildPerSecond()
  }, [slowRefresh])

  return wildPerSecond
}

export const useBurnedBalance = (tokenAddress) => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const provider = useEthersProvider()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, provider)
      const res = await contract.balanceOf('0x0000000000000000000000000000000000000000dEaD')
      setBalance(new BigNumber(res))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useWILDBurnedBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  useEffect(() => {
    const fetchBalance = async () => {
      const wildContract = getWILDContract(provider, chain ? chain.id : CHAIN_ID)
      const res = await wildContract.totalFees()
      setBalance(new BigNumber(res).div(new BigNumber(3))) // 1/3 of total fees are burning
    }

    fetchBalance()
  }, [slowRefresh])

  return balance
}

export const useGetBnbBalance = () => {
  const [balance, setBalance] = useState(BIG_ZERO)
  const { address } = useAccount()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const provider = useEthersProvider()

  useEffect(() => {
    const fetchBalance = async () => {
      const walletBalance = await provider.getBalance(address)
      setBalance(new BigNumber(walletBalance))
    }

    if (address) {
      fetchBalance()
    }
  }, [address, provider, lastUpdated, setBalance])

  return { balance, refresh: setLastUpdated }
}

export default useTokenBalance
