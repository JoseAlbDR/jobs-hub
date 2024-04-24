import { IconChecks, IconHourglass, IconHourglassFilled, IconTrafficLights, IconXboxX } from "@tabler/icons-react"

export const iconStatus = (jobStatus : string)=>{
    switch (jobStatus){
        case 'pendiente':
        return <IconHourglass stroke={1} />
        case 'rechazado':
        return <IconXboxX stroke={1} />
        case 'entrevista':
            return <IconChecks stroke={1} />
        default: 
            return <IconTrafficLights stroke={1} />    
    }

}