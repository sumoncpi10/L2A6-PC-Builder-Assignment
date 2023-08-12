import React from 'react';
import { Avatar, Comment, Tooltip,List } from 'antd/';

import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,StarOutlined,DollarCircleOutlined,StockOutlined
} from "@ant-design/icons";
import Image from "next/image";
import { Table, Divider } from 'antd';


const PartsDetails = ({ part }) => {
  
const dataSource = (part?.key_features || []).map((keyFeature, index) => {
  const [key, value] = keyFeature.split(':');
  return {
    key: index.toString(),
    keyData: key ? key.trim() : '', // Extracted key
    features: value ? value.trim() : '', // Extracted value
  };
});
const columns = [
  {
    title: 'Key',
    dataIndex: 'keyData',
  },
  {
    title: 'Features',
    dataIndex: 'features',
  },
];

    // console.log(part);
  return (
        <>
        <Row style={{ marginTop: "80px", alignItems: "center" }}>
    <Col md={6} lg={12}>
      <Image
        alt="example"
        src={part?.image_url}
        width={500}
        height={300}
        responsive
      />
    </Col>
    <Col md={6} lg={12} style={{ paddingLeft: "20px" ,paddingRight:"30px"}}>
      <h1 style={{ fontSize: "30px" }}>{part?.product_name}</h1>
      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          color: "gray",
          margin: "10px 0px",
          fontSize: "20px",
        }}
      >
        <span>
           <DollarCircleOutlined /> {part?.price}
        </span>
        <span>
       <StockOutlined /> {part?.status}
        </span>
  
        
      </p>
          
          <p style={{ fontSize: "25px", fontWeight: "lighter" }}>
        {part?.description}
          </p>
          

           
      <div
        className="line"
        style={{
          height: "5px",
          margin: "20px 0",
          background: "#000",
          width: "100%",
        }}
      ></div>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          color: "gray",
          margin: "10px 0px",
          fontSize: "20px",
        }}
      >
        <span>
          <StarOutlined /> {part?.rating} Ratings
        </span>
        <span>
         <CommentOutlined /> {part?.reviews?.length} Reviews
        </span>
        <span>
          <ProfileOutlined /> {part?.category}
        </span>
      </p>

      
    </Col>
      </Row>
     
 
  
      <div style={{ padding: 50 }}>
        <h2>Key Features</h2>
      
      <Table columns={columns} dataSource={dataSource} size="middle"  />
        <h2>Reviews ({ part?.reviews?.length})</h2>
         <List
  itemLayout="horizontal"
  dataSource={part?.reviews}
  renderItem={(review) => (
    <List.Item key={review.user}>
      <List.Item.Meta
        avatar={<Avatar icon={<UserOutlined />} />}
        title={review.user}
        description={review.comment}
      />
      <div style={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}>
        {review.rating}
        <Avatar
          style={{ backgroundColor: '#87d068', marginLeft: '8px' }} // You can customize the styles as needed
          icon={<StarOutlined />} // Assuming you have an appropriate icon for the rating
        />
      </div>
    </List.Item>
  )}
/>
      </div>


  </>
    );
};

export default PartsDetails;


export async function getStaticPaths() {
    const res = await fetch('http://localhost:3000/api/products');
    const allProducts = await res.json();

    const paths = allProducts?.data?.map(part => ({
        params: { partsId: part.id.toString() } // Convert id to string
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const { params } = context;
    const url = `http://localhost:3000/api/parts/${params?.partsId}`;
    
    const res = await fetch(url);
    const data = await res.json();

    return {
        props: {
            part: data
        },
        revalidate: 30
    };
}
