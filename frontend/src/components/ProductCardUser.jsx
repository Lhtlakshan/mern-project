import React from 'react'
import { Link } from 'react-router-dom';

const ProductCardUser = (props) => {
  return (
    <Link
      className="w-[200px] h-[220px] bg-violet-200 p-[10px] pt-[4px] rounded-[20px] m-3 shadow-xl"
      to={`/customer/product-overview/${props.id}`}
    >
      <div className="flex flex-col justify-content-center items-center mt-2 font-semibold">
        <img
          className="w-[180px] h-[130px] block rounded-[20px]"
          src={props.image}
          alt=""
        />
        <h1>{props.name}</h1>
        <span className="flex flex-row">
          <h2 className="pl-[10px]">Rs. {props.price}</h2>
        </span>

        <span className="flex flex-row">
          <h2 className="pl-[10px]">Rs. {props.size}</h2>
        </span>
      </div>
    </Link>
  );
}

export default ProductCardUser
