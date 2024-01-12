
const Spinner = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center h-screen">
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-vintage-neutral"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-vintage-primary animate-spin">
        </div>
    </div>
</div>
    </div>
  )
}

export default Spinner