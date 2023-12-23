import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import ProfilePage from "../../pages/ProfilePage";


const AllOrders = () => {
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <button>
                <AiOutlineArrowRight size={20} />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  return (
    <ProfilePage>
    <div className="mx-5 w-auto">

       {/* Header */}

        <div className="">
        <h3 className="text-[#565656] text-xl">All Orders</h3>
        <div className="border-t-2 border-vintage-neutral my-4"></div>
      </div>

    <div className="pl-8 py-5">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>

    </div>
    </ProfilePage>
  );
}

export default AllOrders