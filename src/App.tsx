
function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
    <h1 className="text-3xl font-bold">
      Welcome {user?.name || 'Visitor'},
    </h1>
    </>
  )
}

export default App
