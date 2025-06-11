import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
	const {authUser} = useAuthContext();

	return (
		<>
			<AppNavbar />

			<div className="flex flex-col md:flex-row items-center justify-around px-16 pt-20">
				<img
					src="/Logo.png"
					alt="Logo"
					className="size-60 lg:size-[400px]" 
				/>

				<div className="flex flex-col items-center md:items-end gap-1">
					<h1 className="text-gray-200 text-3xl md:text-4xl lg:text-6xl font-semibold text-center">
						Welcome
					</h1>
					<h2 className="text-blue-400 text-4xl md:text-5xl lg:text-7xl font-bold text-center">
						{authUser?.fullName}
					</h2>
				</div>
			</div>
		</>
	)
}

export default Home