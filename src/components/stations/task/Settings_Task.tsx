import { getTask, updateTask, deleteTask, reset__Task } from 'src/app/state_management/task/taskSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { RootState } from 'src/app/store';
import { useEffect, useState } from 'react';
import Button_S2 from 'src/components/elements/buttons/Button_S2/Button_S2';

 function Settings_Task() {

    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const {activeTask} : any = useAppSelector((state) => state.task)
    const {user} : any = useAppSelector((state : RootState) => state.auth);

    useEffect(() => {
        if(!activeTask.taskName)
        {
            navigator('/project/ltg/objective');
        }
    }, [activeTask])

    const [deletePrompt, setDeletePrompt] = useState(false);

    const [savePrevented, setSavePrevented] = useState(true);
    const [formData, setFormData] = useState({
        taskName: '',
        stationTypeName: '',
        description: ''
    })
    const {taskName, stationTypeName, description} = formData;

    useEffect(()=> {
        setSavePrevented(canSaveSettings())
    }, [taskName, stationTypeName, description])

    const onFormUpdated = (e : Event | any) => {
        e.preventDefault();
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
    }
    
    const onFormSubmitted = async (e: Event | any) => {
        e.preventDefault();
        let body : Object = {};

        for  (let field in formData)
        {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0)
            {
                Object.defineProperty(body, field, {value: val, writable: true, enumerable: true, configurable: true});
            }
        }

        await dispatch(updateTask({body, id: activeTask._id, parentId: activeTask.owningObjective, token: user.token}));
        await dispatch(getTask({id: activeTask._id, parentId: activeTask.owningObjective, token: user.token}));
        navigator('/project/ltg/objective/task');
    }

    const canSaveSettings : () => boolean = () : boolean => {
        let numModifiedProperties = 0;
        for  (let field in formData)
        {
            const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
            if (val.length !== 0)
            {
                ++numModifiedProperties;
            }
        }
        return numModifiedProperties === 0;
    }

    const onDeleteTask = async () => {
        await dispatch(deleteTask({id: activeTask._id, parentId: activeTask.owningObjective, owner: user._id, token: user.token}));
        navigator('/')
    }

  return (
    <div>
        <h2>{`${activeTask.stationTypeName ? activeTask.stationTypeName : activeTask.stationType}`} Settings</h2>
        <form onSubmit={(e) => {onFormSubmitted(e)}}>
            
            <div>
                Name: <br/> 
                <input className="form-input" type="text" placeholder={activeTask.taskName} id="taskName" 
                    name="taskName" value={taskName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <div>
                Station Type Name: <br/>
                <input className="form-input" type="text" placeholder={activeTask.stationTypeName} id="stationTypeName" 
                    name="stationTypeName" value={stationTypeName} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <div>
                Description: <br/>
                <input className="form-input" type="text" placeholder={activeTask.description} id="Description" 
                    name="description" value={description} onChange={(e) => {onFormUpdated(e)}}/>
            </div>
            <Button_S2 type='submit' disabled={savePrevented}>Save</Button_S2>
        </form>
        {deletePrompt ? <div>
            This will delete the Task and all of it's data! <br/>
            Are you sure? <br/>
            <Button_S2 onClick={() => onDeleteTask()}>Delete</Button_S2>
            <Button_S2 onClick={() => setDeletePrompt(false)}>Cancel</Button_S2>
            </div> 
            : <div>
                <Button_S2 onClick={() => setDeletePrompt(true)}>DELETE</Button_S2>
            </div>}
    </div>
  )
}


export default Settings_Task;

