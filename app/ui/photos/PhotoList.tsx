// 'use client'
// import PhotoCard from '@/app/ui/photos/PhotoCard'
// import {usePhotos} from '@/service/photo/usePhotoService';
//
// export default function PhotoList() {
//   const { data: photos } = usePhotos();
//   return (
//     <div>
//       {photos?.slice(3).map((photo) => {
//         return (
//           <PhotoCard {...photo} key={photo.albumId}></PhotoCard>
//         )
//       })}
//     </div>
//   )
// }