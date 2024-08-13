import {Photo} from '@/model/photo';
import BackendService from "@/service/BackendService";

class PhotoService {
  getPhotos(currentPage: number) {
    return BackendService.http.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/photos?_start=${currentPage}&_limit=10`,
    );
  }

  getPhoto(photoId: number) {
    return BackendService.http.get<Photo>(
      `https://jsonplaceholder.typicode.com/photo/${photoId}`,
    );
  }

  getComments(photoId: number) {
    return BackendService.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/photo/${photoId}/comments`,
    );
  }

  getComment({photoId, commentId}: {photoId: number, commentId: number}) {
    return BackendService.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/photo/${photoId}/comments/${commentId}`,
    );
  }
}

const queryKeys = {
  all: ['photos'] as const,
  pagedAll: (page: number) => [...queryKeys.all, page] as const,
  detail: (photoId: number) => [...queryKeys.all, photoId] as const,
  detailComments: (photoId: number) => [...queryKeys.detail(photoId), 'comments'] as const,
  detailComment: ({photoId, commentId}: {photoId: number, commentId: number}) => [...queryKeys.detailComments(photoId), commentId] as const,
};

const photoService = new PhotoService();

export const queryOptions = {
  all: (currentPage: number) => ({
    queryKey: queryKeys.pagedAll(currentPage),
    queryFn: () => photoService.getPhotos(currentPage),
    suspense: true,
  }),
  detail: (photoId: number) => ({
    queryKey: queryKeys.detail(photoId),
    queryFn: () => photoService.getPhoto(photoId),
  }),
  comments: (photoId: number) => ({
    queryKey: queryKeys.detailComments(photoId),
    queryFn: () => photoService.getComments(photoId),
  }),
  comment: ({photoId, commentId}: {photoId: number, commentId: number}) => ({
    queryKey: queryKeys.detailComment({photoId, commentId}),
    queryFn: () => photoService.getComment({photoId, commentId}),
  }),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default photoService;
