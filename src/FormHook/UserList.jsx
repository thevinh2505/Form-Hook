import React from "react";
import { Card, Table, Button } from "antd";
function UserList(props) {
	const columns = [
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
		{
			title: "",
			key: "action",
			render: (_, currentUser) => {
				return (
					<>
						<Button
							onClick={() => {
								console.log('thông tin user',currentUser);
								props.getInfoUser(currentUser);
							}}
						>
							Chỉnh sửa
						</Button>
						<Button
							onClick={() => props.deleteUser(currentUser.id)}
						>
							Xóa
						</Button>
					</>
				);
			},
		},
	];
	return (
		<div>
			<Card
				title="Danh sách người dùng"
				headStyle={{ backgroundColor: "#000000", color: "#ffffff" }}
			>
				<Table
					dataSource={props.userList.map((user) => {
						return { ...user, key: user.id };
					})}
					columns={columns}
				/>
			</Card>
		</div>
	);
}

export default UserList;
