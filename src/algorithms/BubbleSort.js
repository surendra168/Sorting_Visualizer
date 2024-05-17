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

const bubbleSort = async (primaryArray, setPrimaryArray) => {

    let currentArray = primaryArray.map(obj=>obj.value)
    let sorted = false
    let n = currentArray.length
    console.log(n);
    while(!sorted){
        sorted = true

        for(let i = 0; i < n-1; i++){
            for(let j = 0; j < n - i - 1; j++){

                changeColor(setPrimaryArray, j, '#A9DFF3')
                changeColor(setPrimaryArray, j+1, '#A9DFF3')
                await sleep(500)

                if(currentArray[j] > currentArray[j+1]){
                    let temp = currentArray[j]
                    currentArray[j] = currentArray[j+1]
                    currentArray[j+1] = temp

                    changeColor(setPrimaryArray, j, '#F45928')
                    changeColor(setPrimaryArray, j+1, '#F45928')

                    await sleep(500)

                    setPrimaryArray(primaryArray=>primaryArray.map((obj,id)=>{
                        return {...obj,value:currentArray[id]}
                    }))
                    
                    changeColor(setPrimaryArray, j, '#4AF713')
                    changeColor(setPrimaryArray, j+1, '#4AF713') 

                    await sleep(500)
                    sorted=false
                }
                changeColor(setPrimaryArray, j, '#DED0B6')
                changeColor(setPrimaryArray, j+1, '#DED0B6')
            }

            changeColor(setPrimaryArray, n - i - 1, '#F713F3')

            if(i===n-2)
                sorted = true;

            if (sorted){
                for(let j = n - i - 2; j > 0; j--){ 
                    changeColor(setPrimaryArray, j, '#F713F3')                 
                }
                break;
            }
        }
    }

    changeColor(setPrimaryArray, 0, '#F713F3')  

    return
    
  };
  
  export { bubbleSort };