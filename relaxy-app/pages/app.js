import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {createContext, useContext} from 'react'
import {recomendationContext,UsersContext} from './index.js'
import React, { useState, useEffect } from 'react';

var axios = require('axios');  
let data = require('/public/data.json')

export default function Home() {
 
  const refs =useRef([])
  const usersContext = useContext(recomendationContext)

  useEffect(() => {
    rankClick();
    console.log(data)
  }, []);

  //let a = useContext(recomendationContext)

  let categoryData = [
    {key:'rain',category:"nature","time":0},
    {key:'thunderstorm',category:"nature","time":0},
    {key:'waterstream',category:"nature","time":0},
    {key:'forest',category:"nature","time":0},
    {key:'seaside',category:"nature","time":0},
    {key:'fire',category:"people","time":0},
    {key:'leaves',category:"nature","time":0},
    {key:'fan',category:"people","time":0},
    {key:'coffe',category:"people","time":0},
    {key:'wind',category:"nature","time":0},
    {key:'water',category:"nature","time":0},
    {key:'train',category:"people","time":0},
    {key:'guitar',category:"","time":0},
    {key:'grandpiano',category:"instrument","time":0},
  ]    
  let start,stop,time

  
  function handleClick(element,volume=0.5){
    
    /*if(!start){
      start = new Date().getTime()

    }
    else{
      stop = new Date().getTime()
      time = stop-start

      
      categoryData.forEach((item)=>{
        
        item.key == element.dataset.key ? item.time+=time : item.time
        
      })
    
    }*/

    
        
    let slider =element.nextElementSibling.classList
      slider.toggle('invisible')

      let card = element.offsetParent.classList
      card.toggle('bg-base-100')
        
      let audio = element.nextElementSibling.firstChild
      if (audio)
          audio.paused ? audio.play() : audio.pause()
          audio.volume = volume
    
  }

  function recomendationClick(element){
    /*let recomendation
    console.log(typeof element.dataset.key)
    if(element.dataset.key=='0'){
      recomendation=playlist[0]
     
    }if(element.dataset.key=='1'){
      recomendation=playlist[1]
      
    }if(element.dataset.key=='2'){
      recomendation=playlist[2]
      
    }
    recomendation.forEach((item)=>{
      handleClick(refs.current[item])
      console.log(element.dataset.key)
    })
      

    
    

    rewardClick()
    
    console.log(element.dataset.key)
    if(element.dataset.key=='0'){
      console.log('asu')
     
    }if(element.dataset.key=='1'){
      console.log('memek')
      
    }if(element.dataset.key=='2'){
      console.log('')
      
    }*/
    let recomendation = playlist[element.dataset.key]
    console.log(recomendation)
    recomendation.forEach((item)=>{
      handleClick(refs.current[item])
      console.log(element.dataset.key)
    })
    
  }

  const [Res,setRes] = useState([])

  function rewardClick(){
    var data = JSON.stringify({"id":'1'});
    
    var config = {
      method: 'post',
      url: 'https://relaxy.azurewebsites.net/api/reward?',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(response.data)   
    })
    .catch(function (error) {
      console.log(error)
      console.log(config)
    });

    
  }

  async function rankClick(){
    async function fun(){
      let obj
      return fetch('https://relaxy.azurewebsites.net/api/rank', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":"1",
        "category" : data.category,
        "activity" : data.activity})
      }).then(res=>res.json()).then(data=>obj=data)
    }
    const resData = await fun()
    let dataId = [resData[0].id,resData[1].id,resData[2].id]
    let dataPlaylist = [resData[0].playlist,resData[1].playlist,resData[2].playlist]
    console.log(dataPlaylist)
    setRecomendations(dataId)
    setPlaylist(dataPlaylist)
  }

  function volumeSlider(event){
    let slider = event.currentTarget

    let audio = slider.previousSibling

    if (audio)
        audio.volume = slider.value / (slider.max - slider.min)

    
  }

  let initialRecomendations = ['item 1','item 2','item 3']
  const [playlist,setPlaylist] = useState([])
  const [recomendations,setRecomendations] = useState(initialRecomendations)
  let recomendationList = recomendations.map((recomendation,index)=>{
    return <button data-key={index} onClick={(element)=>{recomendationClick(element.currentTarget)}} className='btn btn-outline btn-sm text-s uppercase rounded-full '> {recomendation} </button>
  })

  let sounds = ['rain','thunderstorm','forest','waterstream','seaside','fire','leaves','fan','coffee','wind','water','train','guitar','piano']
  let soundList = sounds.map((sounds,index)=>{
    return <div  id='card'     className="card p-8 mt-16 mx-4 basis-1/4 hover:bg-base-200 cursor-pointer">
              
              <figure data-key={sounds} onClick={(element)=>{handleClick(element.currentTarget)}} ref={(element) => {refs.current[sounds] = element}}><img className='w-24'  src={'/images/'+sounds+'.png'} alt="" /></figure>
              <div class="card-body p-8 pb-0 invisible">
              <audio data-key={sounds} src={'/sounds/'+sounds+'.ogg'}></audio>
              <input data-key={sounds} onClick={volumeSlider} type='range' min="0" max="100" className="range range-xs range-primary"></input>
              </div>
            </div>
  })

  
  
  return (
    <div>
      <Head>
        <title>Relaxy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='py-6 px-12 navbar bg-base-200 justify-between'>
        <div className='flex-l'>
          <h2 className='normal-case text-3xl font-bold text-primary'>
            Relaxy
          </h2>
        </div>
        
        
        
      </header>

      <main className='bg-base-300 min-h-screen py-16'>
        <div id='recomendation' className='space-y-4 flex flex-col mx-auto'>
          <p className='flex justify-center text-xl font-bold'>Recomendation</p>
          <div className='space-x-8 flex justify-center'>
            {recomendationList}
            <button onClick={rankClick} className='btn btn-primary btn-sm text-s normal-case rounded-full '> Refresh recomendation </button>
          </div>

        </div>

        <div id='sound' className='flex flex-wrap px-16 justify-center'>
            {soundList}
        </div>
      </main>

      
      
    </div>
  )
}
