import { Card, Input, Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./style.module.css";
import * as yup from "yup";
import { isEmpty } from "lodash";
function Form(props) {
	const [user, setUser] = useState({
		maSV: "",
		name: "",
		email: "",
		phone: "",
	});

	// state errors
	const [errors, setErrors] = useState({});

	// Schema Yup

	const userSchema = yup.object({
		maSV: yup.string().required("*vui lòng nhập mã sinh viên"),
		name: yup
			.string()
			.required("*vui lòng nhập họ và tên")
			.matches(/^[A-Za-z ]+$/g, "Họ tên phải nhập chữ không dấu"),
		phone: yup
			.string()
			.required("*vui lòng nhập số điện thoại")
			.matches(/^[0-9]+$/g, "*Sai định dạng số điện thoại")
			.min(10, "*Nhập ít nhất 10 kí tự")
			.max(11, "*Nhập tối đa 11 kí tự"),
		email: yup
			.string()
			.required("*vui lòng nhập email")
			.email("*Email không đúng định dạng"),
	});

	useEffect(() => {
		if (!props.selectedUser) {
			return;
		}

		setUser(props.selectedUser);
		console.log("user ham useEffect", user);
	}, [props.selectedUser,errors]);

	const handleChange = (e) => {
		return setUser({ ...user, [e.target.name]: e.target.value });
	};

	async function handleSubmit(e) {
		e.preventDefault();

		// gọi hàm validateForm chạy để validation, nếu mà isValid false-> có lỗi->return luôn k nhận input nưã
		const isValid = await validateForm();
		if (!isValid) return;

		if (props.selectedUser) {
			props.updateUser(user);
		} else {
			props.createUser({
				...user,
				id: Math.floor(Math.random() * 10000 + 1),
			});
		}
		console.log("user ham submit", user);
		resetForm();
	}
	// function validate form
	async function validateForm() {
		// validation
		const validationErrors = {};

		try {
			await userSchema.validate(user, { abortEarly: false });
		} catch (err) {
			const errObj = { ...err };

			errObj.inner.forEach((item) => {
				// kiểm tra lấy lỗi đầu tiên
				if (validationErrors[item.path]) return;
				// chưa có giá trị lỗi thì duyệt tiếp
				validationErrors[item.path] = item.message;
			});

			// duyệt xong obj mới chứa field name và lỗi rồi thì setErrors lại
			// convert đc mảng err yup trả về thành 1 cái mảng err xài đc, key: field name  value: message
			console.log(validationErrors);
			setErrors(validationErrors);
		}
		// check lỗi xong return để check xem form có lỗi hay ko
		return isEmpty(validationErrors);
	}
	// reset form
	const resetForm = () => {
		setUser({ maSV: "", name: "", email: "", phone: "" });
		setErrors({})
	};

	return (
		<div>
			<Card
				headStyle={{ backgroundColor: "#000000", color: "#ffffff" }}
				title="Form Đăng Kí"
			>
				<form className={style.form} onSubmit={handleSubmit}>
					<div className={style.inputGroup}>
						<label>MÃ SV</label>
						<Input
							value={user.maSV}
							placeholder="Mã sinh viên"
							onChange={handleChange}
							name="maSV"
						/>
						<span>{errors.maSV}</span>
					</div>
					<div className={style.inputGroup}>
						<label>Họ tên</label>
						<Input
							value={user.name}
							placeholder="Họ tên"
							onChange={handleChange}
							name="name"
						/>
						<span>{errors.name}</span>
					</div>
					<div className={style.inputGroup}>
						<label>Số điện thoại</label>
						<Input
							value={user.phone}
							placeholder="Số điện thoại"
							onChange={handleChange}
							name="phone"
						/>
						<span>{errors.phone}</span>
					</div>
					<div className={style.inputGroup}>
						<label>Email</label>
						<Input
							value={user.email}
							type="email"
							placeholder="email"
							onChange={handleChange}
							name="email"
						/>
						<span>{errors.email}</span>
					</div>
					<div className={style.buttonGroup}>
						<Button htmlType="submit">Thêm Sinh Viên</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}

export default Form;
