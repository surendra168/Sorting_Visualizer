import React from 'react'
import classes from './dropdown.module.css'

const Dropdown = ({ onChange, disabled }) => {
  return (
    <div className={classes.dropdown}>
      <select onChange={onChange} disabled={disabled}>
        <option value='bubbleSort'>Bubble Sort</option>
        <option value='selectionSort'>Selection Sort</option>
        <option value='insertionSort'>Insertion Sort</option>
        <option value='mergeSort'>Merge Sort</option>
        <option value='quickSort'>Quick Sort</option>
        <option value='heapSort'>Heap Sort</option>
      </select>
    </div>
  )
}

export default Dropdown