

export const DateTime = ({ item }) => {

    return (
        new Date().toLocaleDateString('en-GB') !== new Date(item.TimeStamp || item.createdAt).toLocaleDateString('en-GB')
            ? `${new Date(item.TimeStamp || item.createdAt).toLocaleDateString('en-GB')} ${new Date(item.TimeStamp || item.createdAt).toLocaleTimeString('en-US')}`
            : new Date(item.TimeStamp || item.createdAt).toLocaleTimeString('en-US')
    )
}
