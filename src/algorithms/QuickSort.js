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

const sort = async (arr, setPrimaryArray, left, right) => {
    if (left < right) {

      changeColor(setPrimaryArray, left, '#A9DFF3')
      changeColor(setPrimaryArray, right, '#A9DFF3')

      await sleep(500)


      changeColor(setPrimaryArray, left, '#DED0B6')
      changeColor(setPrimaryArray, right, '#DED0B6')

      let partitionIndex = await partition(arr, setPrimaryArray, left, right)

      await sort(arr, setPrimaryArray, left, partitionIndex - 1)
      await sort(arr, setPrimaryArray, partitionIndex + 1, right)
    }

    else if(left===right){
        changeColor(setPrimaryArray, left, '#F713F3')
        await sleep(500)
    }
}

const partition = async (arr, setPrimaryArray, left, right) => {
    let pivot = arr[right]
    let partitionIndex = left

    changeColor(setPrimaryArray, right, '#EEF10A')
    await sleep(500)

    for (let j = left; j < right; j++) {

      changeColor(setPrimaryArray, j, '#460AF1')
      changeColor(setPrimaryArray, partitionIndex, '#F10A5B')
      
      await sleep(500)

      if (arr[j] <= pivot) {

        let temp = arr[partitionIndex]
        arr[partitionIndex] = arr[j]
        arr[j] = temp

        // changeColor(setPrimaryArray, partitionIndex, '#F45928')
        // changeColor(setPrimaryArray, j, '#F45928')

        // await sleep(500)
        if(j!==partitionIndex){
          
          setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
            return {...obj,value:arr[id]}
          }))

          await sleep(500)
        }
        // changeColor(setPrimaryArray, partitionIndex, '#4AF713')
        // changeColor(setPrimaryArray, j, '#4AF713')

          changeColor(setPrimaryArray, partitionIndex, '#DED0B6')
          await sleep(500)

        partitionIndex++
      }
      changeColor(setPrimaryArray, j, '#DED0B6')
    }

    let temp = arr[partitionIndex]
    arr[partitionIndex] = arr[right]
    arr[right] = temp


    setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
      return {...obj,value:arr[id]}
    }))

    changeColor(setPrimaryArray, right, '#DED0B6')
    changeColor(setPrimaryArray, partitionIndex, '#F713F3')
    
    await sleep(500)

    return new Promise((resolve) => {
        resolve(partitionIndex)
    })
}
const quickSort = async (primaryArray, setPrimaryArray) => {

    let currentArray = primaryArray.map(obj=>obj.value)
    await sort(currentArray, setPrimaryArray, 0, currentArray.length - 1)

    return
    
};
  
  export { quickSort };