import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

export const DEFAULT_GAS_LIMIT = 2000000
export const DEFAULT_GAS_PRICE = 2
export const CHAIN_ID = 8453
export const TESTNET_CHAIN_ID = 84531
export const privateNFTPrice = 0.1
export const publicNFTPrice = 0.05
export const minPrivatePurchase = 0.2
export const maxPrivatePurchase = 2.7
export const maxPublicPurchase = 1.35
export const minPublicPurchase = 0.1
export const privateWILDPrice = 0.35
export const publicWILDPrice = 0.45
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const NUMBER_OF_FARMS_VISIBLE = 12

export const START_PRESALE = Number((new Date(
  new Date('9/10/2023 10:00:00 AM EST').toString()
).getTime() / 1000).toFixed(0))

export const YEAR = 60 * 60 * 24 * 365
export const YEAR_BN = new BigNumber(YEAR)

export const BASE_EXPLORER = "https://basescan.org"

export const HeaderLinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Farms',
    link: '/farms',
  },
  {
    name: 'Presale',
    link: '/presale',
  },
  {
    name: 'Zap',
    link: '/zap',
  },
];

export const socials = [
  {
    icon: () => null,
    name: 'Docs',
    href: 'https://docs.wildbase.farm',
  },
  {
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85" fill="#9199B0" /><path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#000" /></svg>
    ),
    name: 'Youtube',
    href: 'https://youtube.com/@lodgecapital',
  },
  {
    icon: () => (
      <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6496 0.782335C14.8421 0.706071 15.0523 0.680283 15.2587 0.707613C15.465 0.734943 15.6601 0.814408 15.8239 0.937868C15.9877 1.06133 16.1143 1.22434 16.1908 1.41022C16.2673 1.59609 16.291 1.79813 16.2593 1.99565C15.8029 4.8435 14.9661 10.062 14.5218 12.8321C14.4911 13.0238 14.4093 13.2046 14.2845 13.3571C14.1596 13.5096 13.9958 13.6286 13.8089 13.7026C13.6221 13.7766 13.4185 13.8031 13.2179 13.7796C13.0172 13.756 12.8263 13.6832 12.6636 13.5682C11.0922 12.4574 8.7362 10.7921 7.54005 9.94627C7.44774 9.881 7.3715 9.79709 7.31669 9.70046C7.26189 9.60383 7.22987 9.49683 7.2229 9.38702C7.21592 9.27722 7.23415 9.16728 7.27631 9.06497C7.31847 8.96267 7.38353 8.87049 7.46689 8.79495C8.56293 7.80183 10.7459 5.82385 12.2479 4.46286C12.2833 4.4306 12.3048 4.38683 12.3083 4.34013C12.3118 4.29342 12.297 4.24715 12.2668 4.21038C12.2366 4.1736 12.1931 4.14898 12.145 4.14133C12.0968 4.13368 12.0474 4.14356 12.0065 4.16902C10.0807 5.37407 7.13128 7.21941 5.68576 8.12385C5.41486 8.29336 5.1104 8.40739 4.79145 8.45879C4.47249 8.5102 4.1459 8.49787 3.83214 8.42258C3.03618 8.2317 1.88809 7.95627 0.86638 7.71127C0.706418 7.67293 0.563147 7.58713 0.456973 7.46611C0.3508 7.34509 0.287138 7.19501 0.275056 7.03724C0.262974 6.87948 0.303088 6.72209 0.389683 6.58748C0.476279 6.45286 0.604941 6.3479 0.757343 6.28753C4.31403 4.87807 11.2744 2.12003 14.6496 0.782335Z"
          fill="#9199B0"
        />
      </svg>
    ),
    name: 'Telegram',
    href: 'http://t.me/lodgecapital',
  },
  {
    icon: () => (
      <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.2753 2.17153C15.4265 1.99553 15.237 1.74324 15.0148 1.80977C14.7741 1.8818 14.6022 1.51336 14.7613 1.31898C14.8398 1.2231 14.9127 1.12253 14.9795 1.01767C15.1326 0.777575 14.8599 0.538969 14.5983 0.651439C14.3015 0.779061 13.9932 0.884425 13.6752 0.966913C13.4477 1.02593 13.2125 0.942954 13.0325 0.791856C12.4757 0.324435 11.7571 0.0447998 10.9835 0.0447998C9.22256 0.0447998 7.80486 1.47413 7.80486 3.22638C7.80486 3.59348 7.51505 3.93417 7.15101 3.88683C5.39061 3.65787 3.7915 2.92096 2.50025 1.82635C1.88002 1.30057 0.887036 1.41934 0.887036 2.23244C0.887036 2.97168 1.1425 3.65458 1.5661 4.1947C1.74773 4.42628 1.5932 4.78984 1.31652 4.68951C1.1695 4.6362 1.02779 4.57272 0.893459 4.50073C0.879623 4.49331 0.862794 4.50328 0.862794 4.51898C0.862794 5.76619 1.58063 6.84294 2.61743 7.36766C2.80641 7.4633 2.78902 7.74904 2.57722 7.74904C2.30956 7.74904 2.08709 8.01514 2.21654 8.24941C2.36471 8.51757 2.54997 8.76265 2.76541 8.9774C3.34294 9.55309 3.57914 10.7847 2.79615 11.0124C2.22707 11.178 1.62515 11.2671 1.0034 11.2671C0.819312 11.2671 0.737577 11.523 0.900212 11.6092C2.16022 12.2774 3.59384 12.6509 5.12171 12.6509C10.9748 12.6509 14.1748 7.80238 14.1748 3.59971C14.1748 3.56824 14.1746 3.53702 14.1741 3.506C14.1712 3.30817 14.2622 3.12081 14.4173 2.99798C14.7301 2.75019 15.016 2.47345 15.2753 2.17153Z"
          fill="#9199B0"
        />
      </svg>
    ),
    name: 'Twitter',
    href: ' https://x.com/lodgecapital',
  },
]
export const BASE_EXCHANGE_URL_BY_CHAIN = {
  84531: 'https://goerli.basescan.org/',
  8453: 'https://app.alienbase.xyz/',
}

export const BASE_EXCHANGE_URL = BASE_EXCHANGE_URL_BY_CHAIN[CHAIN_ID]

export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/add`
export const BASE_SWAP_URL = `${BASE_EXCHANGE_URL}/swap`
export const ARCHIVED_NODE = "https://developer-access-mainnet.base.org"

// export const YEAR = 60 * 60 * 24 * 365
// export const YEAR_BN = new BigNumber(YEAR)
export const BASE_URL = 'https://app.wildbase.farm'