import { CsvDataContext } from "../../utils/DataTableContext";
import { SearchDataContext } from "../../utils/SearchDataContext";
import Texts from "../reusables/Texts";
import DataTable from "./DataTable";
import { childrens, parent, subChildrens } from "./animations";
import { Modal, MultiSelect, Pagination } from "@mantine/core";
import { saveAs } from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import JSZip from "jszip";
import React, { useContext, useState } from "react";

export default function SectionContent() {
	const { csvData, setCsvData } = useContext(CsvDataContext);
	const [currentPage, setCurrentPage] = useState(0);
	const { searchData, setSearchData } = useContext(SearchDataContext);
	const [value, setValue] = useState("");
	const [opened, setOpened] = useState(false);

	const localDate = new Date().toLocaleDateString("es-ES", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	const productsPerPage = 50;
	const pageCount = Math.ceil(csvData.length / productsPerPage);

	const formatData = (data) => {
		const unique = [...new Set(data.map((item) => item.NUMERO_ORDEN))];
		const formattedData = unique.map((item) => {
			return {
				label: item,
				value: item,
			};
		});
		return formattedData;
	};

	const data = formatData(csvData);

	return (
		<motion.section
			variants={parent}
			initial="hidden"
			animate="visible"
			className="w-full bg-[#faf7f7] px-4 py-2 dark:bg-[#121315] rounded-3xl shadow-lg "
		>
			<div className="container">
				<motion.div
					variants={childrens}
					className="flex items-center justify-between w-full py-2 border-b border-gray-500 dark:text-white"
				>
					<Texts
						content="Resumen de Ordenes"
						{...{ size: "xl", weight: "bold" }}
					/>
					<Modal
						centered
						opened={opened}
						onClose={() => setOpened(false)}
						transition="fade"
						transitionDuration={300}
						transitionTimingFunction="ease"
						size={800}
						overlayBlur={3}
						overlayOpacity={0.5}
						title="Descargar por Nro. de Orden"
					>
						<AnimatePresence>
							<motion.div
								initial={{ x: 200, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: 100, opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="w-full space-y-5"
							>
								<MultiSelect
									placeholder="Selecciona un Nro. de Orden"
									searchable
									nothingFound="No se encontraron resultados"
									maxDropdownHeight={200}
									width={"100%"}
									data={[...data]}
									dropdownPosition="top"
									transitionDuration={150}
									transition="pop-top-left"
									transitionTimingFunction="ease"
									clearable
									onChange={(value) => {
										setValue(value);
									}}
								/>
								<motion.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="px-4 py-2 text-white bg-[#374aee] rounded-md shadow-md"
									onClick={() => {
										const headers = Object.keys(csvData[0]).join("\t");
										if (value.length >= 2) {
											const zip = new JSZip();
											value.forEach((item) => {
												const data = csvData
													.filter((data) => data.NUMERO_ORDEN === item)
													.map((data) => Object.values(data).join("\t"))
													.join("\n");
												zip.file(`${item}.txt`, headers + "\n" + data);
											});
											zip.generateAsync({ type: "blob" }).then((content) => {
												saveAs(content, `reporte_${localDate}.zip`);
											});
										} else {
											const data = csvData
												.filter((data) => data.NUMERO_ORDEN === value[0])
												.map((data) => Object.values(data).join("\t"))
												.join("\n");
											const blob = new Blob([headers + "\n" + data], {
												type: "text/plain;charset=utf-8",
											});
											saveAs(blob, `${value[0]}_${localDate}.txt`);
										}
									}}
								>
									<Texts
										content="Descargar"
										{...{ size: "md", weight: "bold" }}
									/>
								</motion.button>
							</motion.div>
						</AnimatePresence>
					</Modal>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="px-4 py-2 text-white bg-[#374aee] rounded-md shadow-md"
						onClick={() => {
							setOpened(true);
						}}
					>
						Descargar por Nro. de Orden
					</motion.button>
					<Pagination
						total={pageCount || 1}
						siblings={1}
						size="sm"
						radius="md"
						styles={() => ({
							item: {
								"&[data-active]": {
									backgroundColor: "#374aee",
									color: "#fff",
								},
							},
						})}
						onChange={(page) => setCurrentPage(page - 1)}
					/>
				</motion.div>
				<motion.div variants={subChildrens} className="w-full h-full py-2">
					<DataTable
						data={csvData}
						searchData={searchData}
						currentPage={currentPage}
						productsPerPage={productsPerPage}
					/>
				</motion.div>
			</div>
		</motion.section>
	);
}