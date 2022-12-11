import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { selectedPokemon } from '@lib/Context';


export default ({ name, url }: { name: string | null; url: string | null }) => {
	const { data, error, status } = useQuery({
		queryKey: ['Pokemon', name],
		queryFn: async () => {
			if (url !== null) {
				return fetch(url)
					.then((res) => res.json())
					.then((data) => ({
						url: data.url,
						base_experience: data.base_experience as number,
						image: data.sprites.other['official-artwork']
							.front_default as string,
						height: data.height as number,
						weight: data.weight as number,
						specieName: data.species.name as string,
						name: data.name as string,
						index: data.id as number,
					}));
			}
			throw new Error('No URL');
		},
	});
	const dispatch = useDispatch();
	if (data !== undefined) {
		return (
			<button
				onClick={() => {
					dispatch(
						selectedPokemon({
							url: data.url,
							name: data.name,
							image: data.image,
							base_experience: data.base_experience,
							weight: data.weight,
							height: data.height,
							specieName: data.specieName,
						})
					);
				}}
				key={data.index}
				type="button"
				className="border p-4 h-200 w-100 border-gray-200 rounded-lg overflow-hidden bg-[#FFDE00] hover:bg-[#B3A125]"
			>
				<div className="container  h-100 w-100">
					<Image
						src={data.image}
						alt={data.name}
						width={100}
						height={100}
						placeholder="empty"
						className="w-full h-full object-cover"
					/>
				</div>
				<h3 className="capitalize  text-xl mb-2 p-3">{data.name}</h3>
				
			</button>
		);
	} else {
		if (error) {
			console.log('Error at ' + name );
		}
		return (<></>)
	}
};
