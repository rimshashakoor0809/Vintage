import { useDispatch, useSelector } from "react-redux"
import Dashboard from "../../pages/Dashboard"
import { useEffect } from "react";
import { deleteProductAction, getAllSellerProductsAction } from "../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Spinner from "../Layout/Spinner";
import { DataGrid } from '@mui/x-data-grid';


const AllSellerProducts = () => {

  const { isLoading, products } = useSelector((state) => state.products);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();

  console.log("All Seller Products:", products)
  console.log("SellerId: ", seller._id)

  useEffect(() => {
    dispatch(getAllSellerProductsAction(seller._id))
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProductAction(id));
    window.location.reload()
   };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.8,
      minWidth: 100,
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center items-baseline w-full gap-2">
              <button>
                <AiOutlineEye size={25} className="text-vintage-primary" />
              </button>
            <button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={25} className="text-vintage-primary"/>
            </button>
          </div>
        );
      },
    }
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "Rs. " + item.price,
        Stock: item.stock,
      });
    });
  return (
    <Dashboard>
      <div className="mx-5 w-auto">

        {/* Header */}

        <div>
          <h3 className="text-[#565656] text-xl mt-2">All Products</h3>
          <div className="border-t-2 border-vintage-neutral my-4"></div>
        </div>

        <div className="flex flex-row justify-evenly  flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap">

          {/* Form */}
          <div className="w-full ">
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="w-full  rounded-lg">
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            )}

          </div>

        </div>


      </div>
    </Dashboard>
  )
}

export default AllSellerProducts