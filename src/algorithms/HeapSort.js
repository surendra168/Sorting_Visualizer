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

const heapify = async(currentArray, setPrimaryArray, N, i)=>{
    let largest = i;

    let left = 2*i + 1;
    let right = 2*i + 2;

    changeColor(setPrimaryArray, i, '#EEF10A')
    await sleep(500)

    if (left < N){
        changeColor(setPrimaryArray, left, '#460AF1')
        await sleep(500)

        if(currentArray[left] > currentArray[largest]){

            largest = left
            changeColor(setPrimaryArray, largest, '#F45928')
        }
        
        else{
            changeColor(setPrimaryArray, left, '#DED0B6')
        }
        await sleep(500)
    }

    if(right < N){

        changeColor(setPrimaryArray, right, '#460AF1')
        await sleep(500)

        if(currentArray[right] > currentArray[largest]){

            if(largest === left){
                changeColor(setPrimaryArray, left, '#DED0B6')
            }

            largest = right
            changeColor(setPrimaryArray, largest, '#F45928')
        }
        
        else{
            changeColor(setPrimaryArray, right, '#DED0B6')
        }
        await sleep(500)
    }

    if(largest!==i){
        let temp = currentArray[largest]
        currentArray[largest] = currentArray[i]
        currentArray[i] = temp


        setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
            return {...obj,value:currentArray[id]}
        }))
        
        await sleep(500)

        changeColor(setPrimaryArray, i, '#DED0B6')
        changeColor(setPrimaryArray, largest, '#DED0B6')
        
        await heapify(currentArray, setPrimaryArray, N, largest)
    }

    else{
        changeColor(setPrimaryArray, i, '#DED0B6')
        await sleep(500)
    }
}

const buildMaxHeap = async(currentArray, setPrimaryArray)=>{
    let N = currentArray.length

    for(let i = Math.floor(N/2) - 1; i >= 0; i--){
        await heapify(currentArray, setPrimaryArray, N, i)
    }
}

const heapSort = async (primaryArray, setPrimaryArray) => {

    let currentArray = primaryArray.map(obj=>obj.value)
    let N = currentArray.length

    await buildMaxHeap(currentArray, setPrimaryArray);

    for( let i = N-1; i > 0; i--){
        let temp = currentArray[0]
        currentArray[0] = currentArray[i]
        currentArray[i] = temp

        changeColor(setPrimaryArray, i, '#F45928')
        changeColor(setPrimaryArray, 0, '#F45928')
        await sleep(500)

        setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
            return {...obj,value:currentArray[id]}
        }))
        
        changeColor(setPrimaryArray, i, '#4AF713')
        changeColor(setPrimaryArray, 0, '#4AF713')
        await sleep(500)

        changeColor(setPrimaryArray, i, '#F713F3')
        changeColor(setPrimaryArray, 0, '#DED0B6')
        await sleep(500)

        await heapify(currentArray, setPrimaryArray, i, 0)
    }
    changeColor(setPrimaryArray, 0, '#F713F3')
    await sleep(500)

    // setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
    //     return {...obj,value:currentArray[id]}
    // }))

    return
    
};
  
  export { heapSort };