'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page({ params }) {
  const [post, setPost] = useState({});
  const [cargar, setCargar] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [cuerpoMsj, setCuerpoMsj] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://restful-api-project-az4p.onrender.com/api/v1/Articles/${params.id}`)
      const data = await res.json()
      console.log(data)
      setPost(data.data)
    }
    if (cargar) {
      fetchData();
      setCargar(false);
    }
  }, [params.id, cargar])

  async function editarPosts(titulo, mensaje) {
    let response = await fetch(`https://restful-api-project-az4p.onrender.com/api/v1/Articles/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titulo,
        content: mensaje,
        UserId: 4
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    let data = await response.json();
  }

  return (
    <div className="flex flex-col justify-between text-center items-center">
      <div className="flex mt-12">
        <h1 className="font-bold text-4xl"> Mini Blog React + fetch API </h1>
      </div>
      <br />
      <div>
        <form >
          <Input
            placeholder="Título"
            type="text"
            value={post.title}
            className="text-center"
          />
          <br />
          <div className="relative w-full min-w-[400px]">
            <textarea
              className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              cols="21"
              rows="3"
              value={post.content}
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Cuerpo del Mensaje
            </label>
          </div>
          <br />
          <Button type="submit">Editar</Button>
        </form>
      </div>
    </div>
  )
}
