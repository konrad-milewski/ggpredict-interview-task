import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import getData from "./api";
import "./App.css";
import logo from "./logo.svg";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      sort: true,
    },
  },
  {
    name: "nick",
    label: "Nick",
    options: {
      sort: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      sort: false,
    },
  },
  {
    name: "country",
    label: "Country",
    options: {
      sort: false,
    },
  },
];

function App() {
  const [data, setData] = useState<any>({});
  const [inputValue, setinputValue] = useState("");

  const getPlayers = (type: string, value: string | number) => {
    getData(`players?${type}=${value}&searchBy=${inputValue}`)
      .then((data: any) => {
        setData(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const opt: any = {
    filterType: "checkbox",
    rowsPerPage: 20,
    pagination: true,
    rowsPerPageOptions: [20],
    download: false,
    filter: false,
    print: false,
    search: false,
    onChangePage: (pageNumber: number) => getPlayers("page", pageNumber + 1),
    customFooter: () => (
      <div>
        page: {data?.number ? data.number : 1} <br />
        count: {data?.numberOfElements}
        <br />
        totalPages: {data?.totalPages}
        <br />
        {data?.totalPages !== 1 && data?.totalPages !== data?.number + 1 && (
          <>
            <button
              onClick={() =>
                getPlayers("page", data?.number ? data.number - 1 : 1)
              }
            >
              {"<"}
            </button>
            <button
              onClick={() =>
                getPlayers("page", data?.number ? data.number + 1 : 1)
              }
            >
              {">"}
            </button>
          </>
        )}
      </div>
    ),
  };

  useEffect(() => {
    getPlayers("page", 1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) =>
           { e.target.value && setinputValue(e.target.value)
            getPlayers('page', data?.number + 1  )
          }
          }
        ></input>
        <MUIDataTable
          options={opt}
          title={"Players"}
          data={data.content}
          columns={columns}
        />
      </header>
    </div>
  );
}

export default App;
