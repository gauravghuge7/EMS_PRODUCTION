let data = [{
    name: "sharad",
    email: "sajdfk",
    id: "ajd;f",
    status:"pending",
    date:"2 may 2024"
}, {
    name: "nikhil",
    email: "nikhil@gmail.oc",
    id: "32",
    status:"done",
    date:"4 april 2023"
}]

function Report() {
  return (
    <div>

          <h1 className="text-xl font-bold my-3 ml-1">Report</h1>
        <ShowTable/>
    </div>

    
  )
}

function ShowTable() {
  return <div className="w-full border p-6 text-lg rounded-lg">
    <div className="grid font-bold  grid-cols-5">
      <h1>Name</h1>
      <h1>Id</h1>
      <h1>Email</h1>
      <h1>Status</h1>
      <h1>Date</h1>

    </div>
    <div>

      <ShowTabeData DataObject={data} />
    </div>
  </div>
}


function ShowTabeData({ DataObject }) {
  console.log(DataObject)
  return <div>
    {DataObject.map((data, i) => {
      return <div className="grid grid-cols-5 py-2 -mx-3 px-3 rounded-lg border my-3" key={i}>
        <h2>{data.name}</h2>
        <h2>{data.id}</h2>
        <h2>{data.email}</h2>
        <h2 className={`capitalize ${data.status === 'done'?'text-green-700':'text-red-700'}`}>{data.status }</h2>
        <h2>{data.date}</h2>
      </div>

    })}
  </div>

}

export default Report