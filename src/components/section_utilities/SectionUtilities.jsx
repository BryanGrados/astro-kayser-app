import { CsvDataContext } from "../../utils/DataTableContext";
import { SearchDataContext } from "../../utils/SearchDataContext";
import Filedrop from "./Filedrop";
import { childrens, parent, subChildrens } from "./animations";
import { Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconFaceIdError, IconMoodSmile } from "@tabler/icons";
import "dayjs/locale/es";
import { motion } from "framer-motion";
import { Calendar, SearchNormal } from "iconsax-react";
import { useContext } from "react";

export default function SectionUtilities() {
	const { searchData, setSearchData } = useContext(SearchDataContext);
	const { csvData, setCsvData } = useContext(CsvDataContext);

	const localDate = new Date();
	const formatDate = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};

	const clearData = () => {
		showNotification({
			id: "clear-data",
			loading: true,
			color: "teal",
			title: "Eliminando datos",
			message: "Espere un momento por favor...",
			icon: <IconMoodSmile size={16} />,
			autoClose: false,
			disallowClose: true,
		});

		setTimeout(() => {
			updateNotification({
				id: "clear-data",
				color: "teal",
				title: "Datos eliminados",
				message: "Los datos se han eliminado correctamente",
				icon: <IconMoodSmile size={16} />,
				autoClose: 2000,
			});
			setCsvData([]);
			setSearchData("");
		}, 2000);
	};

	return (
		<motion.div
			className="flex w-full bg-[#faf7f7] px-4 py-2 h-28 dark:bg-[#121315] rounded-2xl shadow-lg"
			variants={parent}
			initial="hidden"
			animate="visible"
		>
			<motion.div
				className="container flex justify-between w-full"
				variants={childrens}
			>
				<section className="space-y-5 items-center flex">
					<motion.div
						className="flex items-center h-10 space-x-5"
						variants={subChildrens}
					>
						<TextInput
							placeholder="Buscar..."
							onChange={(e) => setSearchData(e.target.value)}
							icon={<SearchNormal />}
						/>
						<DatePicker
							dropdownType="modal"
							icon={<Calendar />}
							defaultValue={new Date()}
							onChange={(date) => {
								setSearchData(formatDate(date));
							}}
							locale="es"
						/>
					</motion.div>
				</section>
				<Filedrop subChildrens={subChildrens} />
				<section className="flex flex-col items-center justify-center w-56 space-y-3">
					<motion.button
						className="bg-[#374aee] w-full hover:bg-blue-700 text-white font-bold rounded shadow-md"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						variants={subChildrens}
						onClick={
							csvData.length > 0
								? () => {
										const data = csvData.map((item) => {
											return Object.values(item).join("\t");
										});
										const headers = Object.keys(csvData[0]).join("\t");
										const csv = [headers, ...data].join("\r\n");
										const blob = new Blob([csv], { type: "text/csv" });
										const url = window.URL.createObjectURL(blob);
										const a = document.createElement("a");
										a.setAttribute("hidden", "");
										a.setAttribute("href", url);
										a.setAttribute(
											"download",
											`reporte-general-${formatDate(localDate)}.txt`,
										);
										document.body.appendChild(a);
										a.click();
										document.body.removeChild(a);
								  }
								: () =>
										showNotification({
											title: "No hay datos para descargar",
											message: "Por favor, sube un archivo",
											autoClose: 2000,
											color: "red",
											icon: <IconFaceIdError />,
										})
						}
					>
						<Text size={"sm"} className="mx-4 my-3">
							Descargar reporte
						</Text>
					</motion.button>
					<motion.button
						className="bg-[#374aee] w-full hover:bg-blue-700 text-white font-bold rounded shadow-md"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						variants={subChildrens}
						onClick={() => {
							csvData.length > 0
								? clearData()
								: showNotification({
										title: "No hay datos para limpiar",
										message: "Por favor, sube un archivo",
										autoClose: 2000,
										color: "red",
										icon: <IconFaceIdError />,
								  });
						}}
					>
						<Text size={"sm"} className="mx-4 my-3">
							Limpiar
						</Text>
					</motion.button>
				</section>
			</motion.div>
		</motion.div>
	);
}
