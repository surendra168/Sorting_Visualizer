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

  const merge=async(arr, setPrimaryArray, low, mid, high)=>{
    let i = low
    let j = mid+1
    let k = 0
    let tempArr = []

    setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
      return (id >= low && id <= mid)
        ? {...obj,color:'#EEF10A'}
        : obj
    }))

    setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
      return (id > mid && id <= high)
        ? {...obj,color:'#F18F0A'}
        : obj
    }))

    await sleep(500)
    let considered
    
    while (i <= mid && j <= high) {
        if (arr[i] < arr[j]) {
          tempArr[k] = arr[i]
          considered = i
          i++
          k++
        } else {
          tempArr[k] = arr[j]
          considered = j
          j++
          k++
        }

        changeColor(setPrimaryArray, considered, '#F713F3')
        await sleep(500)
        changeColor(setPrimaryArray, considered, considered <= mid ? '#EEF10A' : '#F18F0A')

    }
      while (i <= mid) {
        tempArr[k] = arr[i]

        changeColor(setPrimaryArray, i, '#F713F3')
        await sleep(500)
        changeColor(setPrimaryArray, i, '#EEF10A') 

        i++
        k++
      }
  
      while (j <= high) {
        tempArr[k] = arr[j]

        changeColor(setPrimaryArray, j, '#F713F3')
        await sleep(500)
        changeColor(setPrimaryArray, j, '#F18F0A') 

        j++
        k++
      }
  
      for (let i = low; i <= high; i++) {
        arr[i] = tempArr[i - low]

        setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
          return id===i
            ? {...obj,value:arr[id], color:'#460AF1'}
            : obj
        }))

        await sleep(100)
      }
      await sleep(500)

  }

const sort = async(arr, setPrimaryArray, low, high)=>{
    if(low<high){

        changeColor(setPrimaryArray, low, '#A9DFF3')
        changeColor(setPrimaryArray, high, '#A9DFF3')

        await sleep(500)

        changeColor(setPrimaryArray, low, '#DED0B6')
        changeColor(setPrimaryArray, high,'#DED0B6')

        let mid = Math.floor((low + high) / 2)
        await sort(arr, setPrimaryArray, low, mid)
        await sort(arr, setPrimaryArray, mid+1, high)
        await merge(arr, setPrimaryArray, low,mid,high)

 
        setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
          return (id >= low && id <= high)
            ? {...obj,color:'#DED0B6'}
            : obj
        }))


    }
}
const mergeSort = async (primaryArray, setPrimaryArray) => {
    let currentArray = primaryArray.map(obj=>obj.value)
    await sort(currentArray, setPrimaryArray, 0, currentArray.length-1) 
    return
    
  };
  
  export { mergeSort };