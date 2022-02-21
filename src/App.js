import {useState} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid';

const items2 = [
  
]

const items = [
  {
    _id:uuid(),
    content:'First task'
  },
  {
    _id: uuid(),
    content:'Second task'
  },
  {
    _id: uuid(),
    content:'Third task'
  },
  {
    _id:uuid(),
    content:'Forth task'
  },
  {
    _id: uuid(),
    content:'Fofth task'
  },
  {
    _id: uuid(),
    content:'Sixth task'
  }
]
const data = {
  [uuid()]: {
    _id: 1,
    name: 'To Do',
    items
  },
  [uuid()]: {
    _id: 2,
    name: 'Progress',
    items:items2
  },
  [uuid()]: {
    _id: 3,
    name: 'Blocked',
    items:items2
  },
  [uuid()]: {
    _id: 4,
    name: 'Completed',
    items:items2
  }
}
function App() {
  const [columns, setColumns] = useState(data)
  const onDragEnd = (res, col, setCol) => {
    const {destination, source} = res;
    if(!destination) return;
    if(source.droppableId!==destination.droppableId) {
      const sourceCol = columns[source.droppableId]
      const destCol = columns[destination.droppableId]
      const copiedItemsSource= [...sourceCol.items]
      const copiedItemsDest= [...destCol.items]
      const [removed] = copiedItemsSource.splice(source.index,1);
      copiedItemsDest.splice(destination.index,0 ,removed)
      setColumns({...columns,[source.droppableId]:{...sourceCol, items:copiedItemsSource},[destination.droppableId]:{...destCol, items:copiedItemsDest}})
      
    }else{

      
      const column = columns[source.droppableId];
      const copiedItems= [...column.items]
      const [removed] = copiedItems.splice(source.index,1);
      copiedItems.splice(destination.index,0 ,removed) 
      setColumns({...columns,[source.droppableId]:{...column, items:copiedItems}})
    }
  }
  return (
    <div className="main">
     <DragDropContext  onDragEnd={onDragEnd}>
      {Object.entries(columns).map(([_id,column])=>{
        return (<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h2>
            {column.name}
          </h2>
          <div style={{margin:8,overflowY:'hidden'}}>

          <Droppable  droppableId={_id} key={_id}>
          {(provided,snapshot) => {

            return <div {...provided.droppableProps} ref={provided.innerRef} style={{
              backgroundColor: snapshot.isDraggingOver?'lightblue':'lightgray',
              padding:4,
              width:250,
              minHeight: 500,
              height:'100vh',
              overflow:'scroll',
              overflowY:'hidden',
              overflowX:'hidden'
            }}>
              {column.items.map((item, index)=>{
               
                return <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot)=>{
                    return <div 
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        userSelect:'none',
                        padding:16,
                        margin:'0 0 8px 0',
                        minHeight:'50px',
                        backgroundColor: snapshot.isDragging?'#263B4A':'#456C86',
                        color:'white',
                        ...provided.draggableProps.style
                      }}
                    >
                      {item.content}
                      
                    </div>
                  }}
                </Draggable>
              })}
              {provided.placeholder}
            </div>
          }}
        </Droppable>
        </div>

          </div>
        )
      })}
     </DragDropContext>
    </div>
  );
}

export default App;
