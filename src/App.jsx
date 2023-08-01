import React, { useEffect, useState } from 'react'
import './App.css'

const App2 = () => {
  const [inputvalue, updateinputvalue] = useState("")
  const [index, updateindex] = useState(0)
  const [condition, updatecondition] = useState(true)
  const [array, updatearray] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [dummyarray, updatedummyarray] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [status, setStatus] = useState('all')
  const [animation, setanimation] = useState('')
  
  
  

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(array))
    updatedummyarray(array)
    statusupdater()
  }, [array])
  

  
  useEffect(() => {
    console.log(status, 'status');
    statusupdater()
  }, [status])

  const statusupdater = ()=>{
    if (status == "all") {
      updatedummyarray(array)
    }
    else if (status == "completed") {
      updatedummyarray(
        array.filter((ele, ind) => {
          return ele.type === 'fa-solid fa-check'
        })
      )
    }
    else if (status == "Uncompleted") {
      updatedummyarray(
        array.filter((ele, ind) => {
          return ele.type === 'fa-solid fa-xmark'
        })
      )
    }
  }

  const showdata = (e) => {
    setStatus(e.target.value)
  }
  console.log(dummyarray, 'dummyarray');

  const changestatus = (ele, idx) => {
    var innerindex = array.indexOf(ele)
    updatearray(
      array.map((e, i) => {
        
        if (i == innerindex) {
          if (e.type == "fa-solid fa-check") {
            return { ...e, type: "fa-solid fa-xmark" }
          }
          else {
            return { ...e, type: "fa-solid fa-check" }
          }
        }
        else {
          return e
        }
      })
    )
  }

  const inputfunction = (e) => {
    updateinputvalue(e.target.value)
  }

  const btnfunction = () => {
    if (inputvalue != '') {

      if (condition == true) {
        updatearray([...array, { name: inputvalue, type: "fa-solid fa-xmark" }])
        updateinputvalue('')
      }
      else {
        updatearray(
          array.map((e, i) => {
            if (i == index) {
              return { ...e, name: inputvalue }
            }
            else {
              return e
            }
          })
        )
        updateinputvalue('')
        updatecondition(true)
      }
    }
  }
  console.log(array);

  const editvalue = (value, ind) => {
    updateinputvalue(value.name)
    updateindex(ind)
    updatecondition(false)
  }

  const deletevalue = (selectedIndex) => {
    updatearray(
      array.filter((ele, ind) => {
        return (ind != selectedIndex)
      })
    )
    setanimation('fall')
  }
  console.log(animation);
  const valueup = (ele, ind) => {
    if (array[ind - 1]) {

      var selected = array[ind]
      var prev = array[ind - 1]

      array[ind] = prev
      array[ind - 1] = selected

      updatearray([...array])
    }

  }

  const valuedown = (ele, ind) => {
    if (array[ind + 1]) {
      var selected = array[ind]
      var next = array[ind + 1]

      array[ind] = next
      array[ind + 1] = selected

      updatearray([...array])
    }
  }


 

 



  const ren = dummyarray.map((e, i) => {
    return (
      <>
        <div className='todo'>
            <li className='todo-item'>{e.name}</li>
          <div className="max-width">
            <button className='complete-btn' onClick={() => editvalue(e, i)}><i class="fa-solid fa-file-pen" edit></i></button>
            <button className='trash-btn ' onClick={() => deletevalue(i)}><i class="fa-solid fa-trash" delete></i></button>
            <button className='complete-btn' onClick={() => valueup(e, i)}><i class="fa-solid fa-chevron-up" up></i></button>
            <button className='trash-btn' onClick={() => valuedown(e, i)}><i class="fa-solid fa-chevron-down" down></i></button>
            <button className='complete-btn' onClick={() => changestatus(e, i)}><i className={` ${e.type} `}></i></button>
          </div>
        </div>
      </>
    )
  })





  return (
    <div>
      <header>
        <h1>Todo List</h1>
      </header>
      <form action="">
        <div className='flex'>
          <input type="text" className="todo-input" value={inputvalue} onChange={inputfunction} placeholder='Enter a task' />
        <button class="todo-button" onClick={btnfunction}>
          <i class="fas fa-plus-square"></i>
        </button>
        </div>
        <div class="select">
          <select name="todos" class="filter-todo" onChange={showdata}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="Uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className='todo-container'>
        <ul className= 'todo-list' >{ren}</ul>
      </div>

    </div>
  )
}

export default App2
