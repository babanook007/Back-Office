import { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useAppDispatch } from './Store/store';
import { RootState } from './Store/store';
import { fetchUserData } from './Store/action';

export default function App() {

  /*
  const dispatch = useAppDispatch();
  const { data, error } = useSelector((state: RootState) => state.yourData);

  if (error) {
    return <div className="error">Error: {error}</div>;
    console.log(data);
  }
  const { allData } = useSelector((state: RootState) => ({
    allData: state.allData.data,
  }));

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  */

  return (
    <div>App</div>
  )
}
