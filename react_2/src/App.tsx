
// import { useReducer } from 'react'
import './App.css'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
  //  const [state, disptach] = useReducer(reducer, { count:0, error:null });

   const queryClient = useQueryClient();

   const { data, error, isLoading } = useQuery({
    queryKey:['posts'], 
    queryFn: () =>
    fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json(),
    ),    
    staleTime:4000,
    refetchInterval:3000,
    gcTime:10000
  })

  const {mutate, isPending, isError, isSuccess} = useMutation({
    mutationFn:(newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify(newPost),
        headers:{"Content-type": "application/json; charset=UTF-8"}
      }).then((res)=>res.json()),
      onSuccess:(newPost) => {
        // queryClient.invalidateQueries({ queryKey:['posts']} );
        queryClient.setQueryData(['posts'],  (oldPost)=>[...oldPost, newPost])
      }
    
  });

  if(error || isError) return <div> There was an error</div>
  if(isLoading || isPending) return <div> Data is loading</div>
  return (
    <div className='tutorial'>
      <button onClick={()=>{
        mutate({
            userId: 5000,
            id: 4000,
            title:'This is new post from react app',
            body:"This is the body from new post"
        })
      }
      }> 
      Add post 
      </button>


        {data?.map((post) => (
          <> 
          <h1>{post.id}</h1>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
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
