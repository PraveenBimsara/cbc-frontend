export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-[url(/loginBg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center">
                    <input type="email" className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" placeholder="Email"/>
                    <input type="password" className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]" placeholder="Password"/>
                    <button className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer">Login</button>
                </div>
            </div>
        </div>
    )
} 