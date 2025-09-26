export default function TagsDetailView({params} : {params: {id : string}}) {
    const { id } = params;
    return (
        <main> Tag {id} detail </main>
    )
}