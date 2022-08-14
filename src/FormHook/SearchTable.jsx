import React from "react";
import { Table, Card,Input,Button } from "antd";
import { useState } from "react";



function SearchTable(props) {
    const columns=[
        {
			title: "MÃ SV",
			dataIndex: "maSV",
			key: "maSV",
		},
        {
			title: "Họ tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			key: "phone",
		},
    ]
    const [search,setSearch]=useState('')

    const [searchList,setSearchList]=useState([])
    const handleChange=(e)=>{
        setSearch(e.target.value.trim())
        console.log(e.target.value)
    }

    const handleSearch=(e)=>{
        e.preventDefault()
        const foundUser=props.userList.filter((item)=>{
            return item.name.toUpperCase().includes(search.toUpperCase())
        })
        setSearchList(foundUser)
    }
	return (
		<div>
			<Card>
				<label>Tìm kiếm:</label>
				
                <form onSubmit={handleSearch}>
                    <Input onChange={handleChange} />
                    <Button htmlType="submit">Search</Button>
                </form>
                
                <Table dataSource={searchList.map((item,index)=>{
                    return {...item,key:index}
                })} columns={columns} />
			</Card>
		</div>
	);
}

export default SearchTable;
