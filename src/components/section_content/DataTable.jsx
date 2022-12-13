import { CsvDataContext } from "../../utils/DataTableContext";
import { rowAnimation, tableAnimation } from "./animations";
import { tData, headers } from "./data";
import { useStyles } from "./styles";
import {
	Group,
	Highlight,
	ScrollArea,
	Table,
	Text,
	useMantineColorScheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { motion } from "framer-motion";
import { DirectSend, DocumentUpload, FolderCross } from "iconsax-react";
import Papa from "papaparse";
import { useCallback, useContext } from "react";

export default function DataTable({
	data,
	currentPage,
	productsPerPage,
	searchData,
}) {
	const { classes, cx } = useStyles();
	const { csvData, setCsvData } = useContext(CsvDataContext);
	const { colorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	console.log(tData.length);
	console.log(headers.length);

	const filteredData = data.filter((item) => {
		if (searchData === "") {
			return item;
		} else if (
			Object.values(item)
				.join(" ")
				.toLowerCase()
				.includes(searchData.toLowerCase())
		) {
			return item;
		}
	});

	const parseFile = (file) => {
		Papa.parse(file, {
			header: true,
			dynamicTyping: false,
			complete: (results) => {
				setCsvData(results.data);
			},
		});
	};

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			showNotification({
				id: "load-data",
				loading: true,
				title: "Cargando datos",
				message: "Espere un momento por favor...",
				autoClose: false,
				disallowClose: true,
			});

			setTimeout(() => {
				updateNotification({
					id: "load-data",
					color: "teal",
					title: "Datos cargados",
					message: "Los datos se han cargado correctamente",
					icon: <IconCheck size={16} />,
					autoClose: 2000,
				});
				parseFile(acceptedFiles[0]);
			}, 2000);
		}
	}, []);

	return (
		<ScrollArea sx={{ height: 350, width: "100%" }}>
			{data.length === 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
					exit={{ opacity: 0 }}
				>
					<Dropzone
						maxSize={3 * 1024 ** 2}
						h={350}
						onDrop={onDrop}
						accept={[
							"text/csv",
							"application/vnd.ms-excel",
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
							"text/plain",
						]}
					>
						<Group
							position="center"
							style={{
								minHeight: 315,
							}}
							spacing={"xl"}
						>
							<Dropzone.Accept>
								<DocumentUpload size={50} />
							</Dropzone.Accept>
							<Dropzone.Reject>
								<FolderCross size={50} />
							</Dropzone.Reject>
							<Dropzone.Idle>
								<DirectSend size={50} />
							</Dropzone.Idle>
							<div>
								<Text size="xl" inline>
									Añada archivos en formato CSV
								</Text>
							</div>
						</Group>
					</Dropzone>
				</motion.div>
			) : (
				<Table
					striped
					highlightOnHover
					withColumnBorders
					sx={{ minWidth: 200 }}
				>
					<thead
						variants={tableAnimation}
						initial="hidden"
						animate="visible"
						className={cx(classes.header)}
					>
						<tr>
							{tData.map((item) => (
								<th key={item}>{item}</th>
							))}
						</tr>
					</thead>
					<motion.tbody variants={rowAnimation}>
						{filteredData.length > 0
							? filteredData
									.slice(
										currentPage * productsPerPage,
										(currentPage + 1) * productsPerPage,
									)
									.map((item, index) => (
										// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<tr key={index}>
											{Object.values(item).map((value, index) => (
												// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												<td key={index}>
													{searchData === value ? (
														<Highlight
															highlight={searchData.toString()}
															highlightColor={
																dark ? "yellow" : "rgba(0, 0, 0, 0.2)"
															}
														>
															{value.toString()}
														</Highlight>
													) : (
														value
													)}
												</td>
											))}
										</tr>
									))
							: data
									.slice(
										currentPage * productsPerPage,
										(currentPage + 1) * productsPerPage,
									)
									.map((item, index) => (
										// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<tr key={index}>
											{Object.values(item).map((value, index) => (
												// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												<td key={index}>{value}</td>
											))}
										</tr>
									))}
					</motion.tbody>
				</Table>
			)}
		</ScrollArea>
	);
}
