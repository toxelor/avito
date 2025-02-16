import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { clearItemById, getList } from "../../store/MainSlice"
import { Button, Input, Pagination, Select } from "antd"
import styles from './List.module.css'
import { Link } from "react-router-dom"
import { selectOptions } from "../../helpers/selectOptions"
import { ItemType } from "../../types"

function List() {

  const dispatch = useAppDispatch()
  const listOfGoods = useAppSelector(state => state.MainSlice.list)
  const [type, setType] = useState()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredData, setFilteredData] = useState(listOfGoods)

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentData = filteredData?.length || (type || searchQuery) ? filteredData.slice(startIndex, endIndex) : listOfGoods.slice(startIndex, endIndex);

  useEffect(() => {
    if (type) {
      let temp = listOfGoods
      temp = listOfGoods.filter((el: ItemType) => el?.type === type)
      if (searchQuery)
        temp = temp.filter((el: ItemType) => el?.name?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
      setFilteredData(temp)
    } else {
      setFilteredData(listOfGoods)
      setSearchQuery("")
    }
  }, [type])

  useEffect(() => {
    if (searchQuery) {
      let temp = listOfGoods
      if (type)
        temp = listOfGoods.filter((el: ItemType) => el?.type === type)
      temp = temp.filter((el: ItemType) => el?.name?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
      setFilteredData(temp)
    } else {
      setFilteredData(listOfGoods)
    }
  }, [searchQuery])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const request = dispatch(getList())
    dispatch(clearItemById())

    return () => {
      request.abort()
    } 
  }, [])

  return (
    <>
      <div className={styles.header}>
          Список объявлений
      </div>
      <div className={styles.inputDiv}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск объявлений по названию"
        />
      </div>
      <div className={styles.buttonsDiv}>
        <div className={styles.filterDiv}>
          <Select
            style={{ width: 150}}
            options={selectOptions}
            value={type}
            onChange={(e) => setType(e)}
            placeholder="Тип объявления"
          />
          <Button onClick={() => setType(undefined)}>
            Очистить фильтр
          </Button>

        </div>
        <Link to={'/form'}>
          <Button onClick={() => localStorage.setItem('action', 'create')}>
            Разместить объявление
          </Button>
        </Link>

      </div>
      <div style={{ height: '450px' }}>
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {
            currentData.map((el: ItemType) => (
              <div key={el?.id} style={{display: 'flex', maxWidth: '600px', border: '1px solid rgb(217, 217, 217)', borderRadius: '10px', padding: '10px', gap: '20px'}}>
                <div style={{width: '120px', height: '120px'}}>
                  <img style={{width: '120px', height: '120px'}} src={el?.image ? el?.image : '/fallback.png'}/>
                </div>
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-around'}}>
                  <span style={{ fontSize: '30px' }} className={styles.desc}>{el?.name}</span>
                  <span style={{ fontSize: '20px' }} className={styles.desc}>{el?.type}</span>
                  <span style={{ fontSize: '15px', color: 'GrayText' }} className={styles.desc}>{el?.location}</span>

                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Link to={`/item/${el?.id}`}>
                    <Button type="primary" style={{ height: '75px' }}>
                      Открыть
                    </Button>
                  </Link>

                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px', borderTop: '1px solid rgb(217, 217, 217)', paddingTop: '10px'}}>
        <Pagination
          current={currentPage}
          pageSize={5}
          total={listOfGoods.length}
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default List
