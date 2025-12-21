export function StatusTranslate(statusName)
{
    if(statusName=='Pending')
        {
            return "Pendiente";
        }
    if(statusName=='In progress')
        {
            return "En progreso";
        }
    if(statusName=='Delivery')
        {
            return "Delivery";
        }
    if(statusName=='Ready')
        {
            return "Listo";
        } 
    if(statusName=='Closed')
        {
            return "Cerrada";
        }           
}