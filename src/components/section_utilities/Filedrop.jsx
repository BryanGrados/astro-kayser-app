import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { motion } from "framer-motion";
import { DirectSend, DocumentUpload, FolderCross } from "iconsax-react";
import Papa from "papaparse";
import { useCallback, useContext, useState } from "react";
import { CsvDataContext } from "../../utils/DataTableContext";

export default function Filedrop({ subChildrens }) {
	const { csvData, setCsvData } = useContext(CsvDataContext);

	const parseFile = (file) => {
		Papa.parse(file, {
			header: true,
			dynamicTyping: false,
			encoding: "ISO-8859-1",
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
		<section className="flex items-center justify-center w-56">
			<motion.div variants={subChildrens}>
				<Dropzone
					onDrop={onDrop}
					className="xl:w-[300px] md:w-[100px] w-[80px]"
					accept={[
						"text/csv",
						"application/vnd.ms-excel",
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						"text/plain",
					]}
				>
					<Group position="center">
						<Dropzone.Accept>
							<DocumentUpload />
						</Dropzone.Accept>
						<Dropzone.Reject>
							<FolderCross />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<DirectSend />
						</Dropzone.Idle>
						<Text className="hidden xl:block">
							Arrastra y suelta el archivo
						</Text>
					</Group>
				</Dropzone>
			</motion.div>
		</section>
	);
}
