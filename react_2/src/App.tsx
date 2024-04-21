
import { useReducer } from 'react'
import './App.css'
import { useQuery } from "@tanstack/react-query"
interface State {
  count:number,
  error:string | null
}

interface Action {
  type: 'increment' | 'decrement'
}

function reducer(state: State, action:Action){
  const { type } = action;

  switch (type){
    case 'increment':{
      const newCount = state.count + 1; 
      const hasError = newCount > 5;

      return {...state, 
        count:hasError ? state.count : newCount,
        error: hasError ? 'Maximum reached': null
      }
    }
    case 'decrement':{
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return {...state, 
        count:hasError ? state.count : newCount,
        error: hasError ? 'Minimum reached': null
      }
    }
  }
}
//https://jsonplaceholder.typicode.com/todos/



function App() {
   const [state, disptach] = useReducer(reducer, { count:0, error:null });

   const { data, error, isLoading } = useQuery({
    queryKey:['todo'], 
    queryFn: () =>
    fetch('https://jsonplaceholder.typicode.com/todos/').then((res) =>
      res.json(),
    ),
  })

  console.log(data)

  if(error) return <div> There was an error</div>
  if(isLoading) return <div> Data is loading</div>
  return (
    <div className='tutorial'>

        {data?.map((todo) => (
          <> 
          <h1>{todo.id}</h1>
          <h1>{todo.title}</h1>
          </>

        ))}



        {/* <div>
          Count: {state.count}
        </div>
        {state.error && <div> {state.error} </div>}
        <button onClick={()=>disptach({type:'increment'})}>
          Increment
        </button>
        <button onClick={()=>disptach({type:'decrement'})}>
          Decrement
        </button> */}




    </div>
  )
}

export default App
