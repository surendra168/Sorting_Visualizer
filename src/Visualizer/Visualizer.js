import {React, useState,useEffect, useCallback} from 'react'
import classes from './visualizer.module.css'
import Button from '../assets/Button/Button'
import Dropdown from '../assets/DropDown/Dropdown'
import { bubbleSort } from '../algorithms/BubbleSort'
import { mergeSort } from '../algorithms/MergeSort'
import { quickSort } from '../algorithms/QuickSort'
import { heapSort } from '../algorithms/HeapSort'

const ARRAYSIZE = 10

export default function Visualizer() {

    const [primaryArray, setPrimaryArray] = useState([])
    const [arraySize, setArraySize] = useState(ARRAYSIZE)
    const [algorithm, setAlgorithm] = useState('bubbleSort')
    const [disableOptions, setDisableOptions] = useState(false)
 
    const handleChange = (event) => {
      setArraySize(event.target.value)
    }
    const randomizeArray = useCallback(() => {

        if (!(/^[1-9]\d*$/.test(arraySize) && arraySize >= 1 && arraySize <= 25)){
            alert('Please enter a valid integer between 1 and 25.');
            return
        }

        // for (let i = 0; i < primaryArray.length; i++) {
        //     let bar = document.getElementById(i).style
        //     bar.backgroundColor = '#DED0B6'
        // } 

        const nums = parseInt(arraySize, 10)
        let array = []
        
        for (let i = 0; i < nums; i++) {
          let object = {id:i, value:randomVals(50, 400), color:'#DED0B6'}
          array.push(object)
        }
    
        setPrimaryArray(array)
      },[arraySize]);
    
      const randomVals = (min, max) => {
        let randomVal = Math.floor(Math.random() * (max - min + 1) + min)
        return randomVal
      }
    
      useEffect(() => {
        randomizeArray()
        // eslint-disable-next-line
      }, [])

      const sleep = (milliSeconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliSeconds))
      }

      const changeColor = (setPrimaryArray, id, col) =>{
        setPrimaryArray(primaryArray=>primaryArray.map(obj=>{
            return obj.id === id
                ? {...obj, color: col}
                : obj
        }))
      }
      
      const finishedAnimation = async () => {
        for (let i = 0; i < primaryArray.length; i++) {
          changeColor(setPrimaryArray, i, '#4AF713')
          await sleep(100)
        }
        setDisableOptions(false)
      }
      
      const handleSorting = () => {
        setDisableOptions(true)
        switch (algorithm) {
            case 'bubbleSort':
              bubbleSort(primaryArray,setPrimaryArray).then(()=>{finishedAnimation()})   
              break
            case 'mergeSort':
              mergeSort(primaryArray,setPrimaryArray).then(()=>{finishedAnimation()})
              break
            case 'quickSort':
              quickSort(primaryArray,setPrimaryArray).then(()=>{finishedAnimation()})
              break
            case 'heapSort':
              heapSort(primaryArray,setPrimaryArray).then(()=>{finishedAnimation()})
              break
            default:
              break
          }
      }

    return (
        <div className={classes.container}>
            <div className = {classes.controlBar}>
                <div className = {[classes.action, classes.textboxContainer].join(' ')}>
                    <input 
                        type="text" 
                        class={classes.textbox} 
                        placeholder="Enter Array Size (1-25)"
                        value={arraySize}
                        onChange={handleChange}
                        disabled={disableOptions}
                    />
                    <Button
                        type='NEWARRAY'
                        name='New Array'
                        onClick={randomizeArray}
                        disabled={disableOptions}
                    />
                </div>

                <div className = {classes.action}>
                    <Dropdown
                        onChange={(e) => setAlgorithm(e.target.value)}
                        disabled={disableOptions}
                    />
                </div>

                <div className = {classes.action}>
                    <Button
                        onClick={handleSorting}
                        type='SORT'
                        name='Sort'
                        disabled={disableOptions}
                    /> 
                </div>

            </div>

            <div className={classes.sortingBars}>
                {primaryArray &&
                primaryArray.map((obj) => {
                    let styles = {
                      height: obj.value,
                      backgroundColor:obj.color
                    }
                    return (
                    <div
                        className={classes.bars}
                        id={obj.id}
                        key={obj.id}
                        style={styles}
                    >{obj.value}</div>
                )
            })}
            </div>

        </div>
  )
}
