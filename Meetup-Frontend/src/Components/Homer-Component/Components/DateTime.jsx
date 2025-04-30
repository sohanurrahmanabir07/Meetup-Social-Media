

export const DateTime = ({item}) => {
    
    return(
    new Date().toLocaleDateString('en-GB') !== new Date(item.TimeStamp).toLocaleDateString('en-GB')
    ? `${new Date(item.TimeStamp).toLocaleDateString('en-GB')} ${new Date(item.TimeStamp).toLocaleTimeString('en-US')}`
    : new Date(item.TimeStamp).toLocaleTimeString('en-US')
    )
}
