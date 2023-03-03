export default defineEventHandler((event) => {
    const query = getQuery(event)
    let getId = query.id

    
    return { a: query.param1, b: query.param2 }
})