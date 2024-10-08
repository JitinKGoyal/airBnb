'use client';

import { signIn } from 'next-auth/react';

import React, { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
	const [loading, setLoading] = useState(false);
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setLoading(true);
		signIn('credentials', {
			...data,
			redirect: false
		}).then(callback => {
			setLoading(false);

			if (callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account!" />
			<Input register={register} id="email" disabled={loading} label="Email" errors={errors} required />
			<Input register={register} id="password" disabled={loading} label="Password" errors={errors} required />
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button outline label="Continue with google" icon={FcGoogle} onClick={() => {}} />
			<Button outline label="Continue with github" icon={AiFillGithub} onClick={() => {}} />
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="justify-center text-center flex flex-row items-center gap-2">
					<div>First time using Airbnb?</div>
					<div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
						Create an account
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isOpen={loginModal.isOpen}
			actionLabel="Login"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
