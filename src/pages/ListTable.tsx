import React, { ComponentType, ReactComponentElement, ReactNode, useEffect, useState } from "react"
import { message, Table, TableColumnsType, Space, Button, TablePaginationConfig } from "antd"
import moment from "moment"

import axios, { articlesAxiosType, articleType, articlesDataType } from "@/utils/axios"
import "./less/listtable.less"
import { JSXElement, JSX_TYPES } from "@babel/types"
import { useNavigate } from "react-router-dom"

type myTitlePropsType = { id: number; title: string; subTitle: string }

interface dataSourceType {
    id: number
    date: string
    author: string
    myTitle: JSX.Element
}

// 标题组件
function MyTitle(props: myTitlePropsType) {
    return (
        <div>
            <a className="table_title" href={"http://codesohigh.com:8765/article/" + props.id} target="_blank">
                {props.title}
            </a>
            <p style={{ color: "#999" }}>{props.subTitle}</p>
        </div>
    )
}

const ListTable = () => {
    const [dataSource, setDataSource] = useState([] as dataSourceType[])
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 10 })
    const navigate = useNavigate()

    useEffect(() => {
        getArticlesList(pagination.current, pagination.pageSize)
    }, [])

    const getArticlesList = (current: number, pageSize: number) => {
        axios.get(`/article?num=${current}&count${pageSize}`).then((res: articlesAxiosType) => {
            const data: dataSourceType[] = res.data.arr.map(article => {
                return {
                    date: moment(article.date).format("YYYY-MM-DD hh:mm:ss"),
                    myTitle: <MyTitle id={article.id} subTitle={article.subTitle} title={article.title} />,
                    id: article.id,
                    author: article.author,
                }
            })
            if (res.errCode !== 0) {
                message.error(res.message)
            } else {
                const { num, total, count } = res.data
                setPagination({ current: num, pageSize, total })
                setDataSource(data)
            }
        })
    }

    const pageChange = (pagination: TablePaginationConfig) => {
        getArticlesList(pagination.current!, pagination.pageSize!)
    }
    const deleteArticle = (id: number) => {}

    const columns: TableColumnsType<dataSourceType> = [
        {
            title: "作者",
            dataIndex: "author",
            key: "author",
            width: "20%",
            align: "center",
        },
        {
            title: "标题",
            dataIndex: "myTitle",
            key: "id",
            width: "30%",
            render: (text: JSX.Element) => text,
            align: "center",
        },
        {
            title: "发表日期",
            dataIndex: "date",
            width: "30%",
            key: "date",
            align: "center",
        },
        {
            title: "编辑/删除",
            key: "action",
            width: "20%",
            align: "center",
            render: (_, record) => {
                return (
                    <Space size="middle">
                        {/* text.key就是id */}
                        <Button type="primary" onClick={() => navigate("/edit/" + record.id)}>
                            编辑
                        </Button>
                        <Button danger onClick={() => deleteArticle(record.id)}>
                            删除
                        </Button>
                    </Space>
                )
            },
        },
    ]

    return (
        <div className="List_table">
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={record => record.id}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    )
}

export default ListTable
