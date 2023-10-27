'use client'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const { setTheme } = useTheme()
  const [posts, setPosts] = useState([]);
  const [cargar, setCargar] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [cuerpoMsj, setCuerpoMsj] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://restful-api-project-az4p.onrender.com/api/v1/Articles/')
      const data = await res.json()
      console.log(data)
      console.log(data.id)
      setPosts(data.data)
    }
    if (cargar) {
      fetchData();
      setCargar(false);
    }
  }, [cargar])

  const borrarPost = async (id) => {
    let response = await fetch(
      `https://restful-api-project-az4p.onrender.com/api/v1/Articles/${id}`,
      {
        method: "delete"
      }
    );
    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    } else {
      return;
    }
  }

  async function agregarPosts(titulo, mensaje) {
    let response = await fetch("https://restful-api-project-az4p.onrender.com/api/v1/Articles/", {
      method: "POST",
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
    setPosts((posts) => [data, ...posts]);
    setTitulo("");
    setCuerpoMsj("");
  }

  function controladorDelEnvio(e) {
    e.preventDefault()
    agregarPosts(titulo, cuerpoMsj)
  }

  return (
    <div className="flex flex-col justify-between text-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-0 mt-6 mr-10">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex mt-12">
        <h1 className="font-bold text-4xl"> Mini Blog React + fetch API </h1>
      </div>
      <br />
      <div>
        <form onSubmit={controladorDelEnvio}>
          <Input
            placeholder="Título"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="text-center"
          />
          <br />
          <div className="relative w-full min-w-[400px]">
            <textarea
              className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              cols="21"
              rows="3"
              value={cuerpoMsj}
              onChange={(e) => setCuerpoMsj(e.target.value)}
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Cuerpo del Mensaje
            </label>
          </div>
          <br />
          <Button type="submit">Crear</Button>
        </form>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.map((post) => {
          return (
            <div className="container mx-auto bg-gray-100 py-10 flex justify-center" key={post.id}>
              <div className="bg-white w-80 shadow-lg cursor-pointer rounded transform hover:scale-105 duration-300 ease-in-out">
                <div className="">
                  <img src="https://picsum.photos/400/300" alt="" className="rounded-t" />
                </div>
                <div className="p-4">
                  <h2 className="text-2xl uppercase font-semibold dark:text-slate-800">{post.title}</h2>
                  <p className="text-left dark:text-slate-800">{post.content}</p>
                  <div className="inline-flex gap-10 mt-4">
                    <Button type="button" onClick={() => borrarPost(post.id)} variant="destructive" className="flex">Borrar Post</Button>
                    <Button type="button" className="flex"><a href={`/editar/${post.id}`}>Editar Post</a></Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
