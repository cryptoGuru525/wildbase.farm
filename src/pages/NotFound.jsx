import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center flex-col mt-8'>
        <div className='hero_banner'>Not Found</div>
        <div className='hero_title'>
          THE HIGHEST YIELD FARM ON <span className='hero_strong'>BASE</span>
        </div>
      </div>
      <div className='flex'>
        <video autoPlay loop muted>
          <source src='/images/nft.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='m-2 flex flex-col items-center justify-center mb-10'></div>
    </div>
  )
}
