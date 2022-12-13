import { motion } from "framer-motion";
import AsideMenu from "../components/AsideMenu";
import MainHeader from "../components/MainHeader";
import SectionContent from "../components/section_content/SectionContent";
import SectionUtilities from "../components/section_utilities/SectionUtilities";
import { CsvDataProvider } from "../utils/DataTableContext";
import { SearchDataProvider } from "../utils/SearchDataContext";

const main = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.3,
		},
	},
};

const childrens = {
	hidden: {
		y: "100vw",
	},
	visible: {
		y: 0,
		transition: {
			type: "spring",
			stiffness: 100,
			mass: 0.3,
		},
	},
};

export default function App() {
	return (
		<motion.main variants={main} initial="hidden" animate="visible">
			<motion.div variants={childrens} className="flex h-screen">
				<AsideMenu />
				<aside className="flex flex-col w-full h-full space-y-5">
					<MainHeader />
					<section className="container space-y-10">
						<SearchDataProvider>
							<CsvDataProvider>
								<SectionUtilities />
								<SectionContent />
							</CsvDataProvider>
						</SearchDataProvider>
					</section>
				</aside>
			</motion.div>
		</motion.main>
	);
}
