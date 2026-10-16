import { useEffect } from 'react';
import { getFaqs } from '@/services/apis/contentful';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store/appStore';
import { GetFaqsParams } from '@/shared/types/api/contentful';

const useFaqs = ({ limit, skip, category }: GetFaqsParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const faqData = useSelector((state: RootState) => state.cms.faqData);

  useEffect(() => {
    dispatch(getFaqs({ limit, skip, category }));
  }, [dispatch, limit, skip, category]);

  return {
    faqs: faqData?.faqs ?? [],
    faqLoading: faqData?.loading ?? false,
    faqTotal: faqData?.total ?? 0,
    faqError: faqData?.error ?? null,
  };
};

export default useFaqs;
