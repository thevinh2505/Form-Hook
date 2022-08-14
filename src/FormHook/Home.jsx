import React from "react";
import Form from "./Form";
import UserList from "./UserList";

import { useState } from "react";
import SearchTable from "./SearchTable";

function Home() {
	const [userList, setUserList] = useState([]);

	// selectedUser state để lưu tt user cần chỉnh sửa
	const [selectedUser, setSelectedUser] = useState(null);

	const createUser = (user) => {
		const foundIndex = userList.findIndex((item) => {
			return item.maSV === user.maSV;
		});
		if (foundIndex!==-1) {
			return alert("da co nguoi dung");
		}
		setUserList([...userList, user]);
        console.log('user ham createUser',user);
	};

	const getInfoUser = (user) => {
		setSelectedUser(user);
	};
	const updateUser = (user) => {
		const cloneUserList = [...userList];
		const  foundIndex = cloneUserList.findIndex((item) => {
			return item.maSV === user.maSV;
		});
        if(foundIndex===-1) return
		cloneUserList[foundIndex] = user;
		setUserList(cloneUserList);
        setSelectedUser(null)
	};
    const deleteUser=(id)=>{
        const cloneUserList=[...userList]
        const foundIndex=userList.findIndex((item)=>item.id===id)
        if(foundIndex===-1) return
        cloneUserList.splice(foundIndex,1)
        setUserList(cloneUserList)
    }
	return (
		<div>
			<h1>Quản lí User</h1>
			<Form
				createUser={createUser}
				selectedUser={selectedUser}
				updateUser={updateUser}
			/>
			<UserList getInfoUser={getInfoUser} userList={userList} deleteUser={deleteUser} />
			<SearchTable userList={userList}/>
		</div>
	);
}

export default Home;
