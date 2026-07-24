import { appState } from "@/shared/interface/sliceInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resendOtp, signup, verifyEmail, verifyOtp } from "@/shared/apis/auth";
import { BlogArticle, FaqFields, ReviewFields } from "@/shared/interface/commonInterface";

const initialState: appState = {
    lightTheme: true,
    sidebarOpen: true, // TODO make it starting with is
    filterSideBarOpen: true, // TODO make it starting with is
    isNotificationsOpen: false,
    forgotPassword: false,
    otpTimerIsRunning: false,
    otpExpiresAt: null,
    articles: [],
    articleCategories: [],
    reviews: [],
    faqs: [],
    faqLoaded: false,
    faqLoading: false,
    faqTotal: 0,
    isLiveChatBubbleOpen: false,
}

const stateSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.lightTheme = !state.lightTheme;
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        toggleFilterSideBar: (state) => {
            state.filterSideBarOpen = !state.filterSideBarOpen;
        },
        toggleNotificationContainer: (state) => {
            state.isNotificationsOpen = !state.isNotificationsOpen;
        },
        setForgotPassword: (state, action: PayloadAction<boolean>) => {
            state.forgotPassword = action.payload;
        },
        setArticles: (state, action: PayloadAction<BlogArticle[]>) => {
            state.articles = action.payload;
        },
        setArticleCategories: (state, action: PayloadAction<string[]>) => {
            state.articleCategories = action.payload;
        },
        setReviews: (state, action: PayloadAction<ReviewFields[]>) => {
            state.reviews = action.payload;
        },
        setFaqLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.faqLoading = action.payload;
        },
        setFaqTotal: (
            state,
            action: PayloadAction<number>
        ) => {
            state.faqTotal = action.payload;
        },
        appendFaqs: (
            state,
            action: PayloadAction<FaqFields[]>
        ) => {

            const existingIds = new Set(
                state.faqs.map(faq => faq.id)
            );

            const newFaqs = action.payload.filter(
                faq => !existingIds.has(faq.id)
            );

            state.faqs.push(...newFaqs);
            state.faqLoaded = true;
        },
        clearFaqs: (state) => {
            state.faqs = [];
            state.faqLoaded = false;
            state.faqTotal = 0;
        },
        toggleLiveChatBubble: (state) => {
            state.isLiveChatBubbleOpen = !state.isLiveChatBubbleOpen;
        }
    },
    extraReducers(builder) {
        builder.addCase(signup.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(signup.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300000;
                state.otpTimerIsRunning = true;
            })
            .addCase(signup.rejected, (state) => {
                state.otpTimerIsRunning = false;
            });

        builder.addCase(verifyOtp.pending, () => { })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.otpExpiresAt = 0;
                state.otpTimerIsRunning = false;
            })
            .addCase(verifyOtp.rejected, () => { });

        builder.addCase(resendOtp.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(resendOtp.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300 * 1000;
                state.otpTimerIsRunning = true;
            })
            .addCase(resendOtp.rejected, (state) => {
                state.otpTimerIsRunning = false;
            })
        builder.addCase(verifyEmail.pending, (state) => {
            state.otpTimerIsRunning = false;
        })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.otpExpiresAt = Date.now() + 300000;
                state.otpTimerIsRunning = true;
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.otpTimerIsRunning = false;
            })
    },
});

export const {
    clearFaqs,
    setReviews,
    appendFaqs,
    setArticles,
    setFaqTotal,
    toggleTheme,
    setFaqLoading,
    toggleSidebar,
    setForgotPassword,
    toggleFilterSideBar,
    setArticleCategories,
    toggleLiveChatBubble,
    toggleNotificationContainer,
} = stateSlice.actions;

export default stateSlice.reducer;