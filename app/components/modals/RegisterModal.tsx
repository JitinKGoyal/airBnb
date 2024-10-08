'use client';

import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import useRegisterModal from '../../hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OAuthProviderType } from 'next-auth/providers/oauth-types';
import useLoginModal from '../../hooks/useLoginModal';

const RegisterModal = () => {
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
			name: '',
			email: '',
			password: ''
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = values => {
		setLoading(true);
		axios
			.post('/api/register', values)
			.then(() => {
				registerModal.onClose();
			})
			.catch(err => {
				toast.error('Something went wrong.');
			})
			.finally(() => setLoading(false));
	};

	const toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome to Airbnb" subtitle="Create an account!" />
			<Input register={register} id="email" disabled={loading} label="Email" errors={errors} required />
			<Input register={register} id="name" disabled={loading} label="Name" errors={errors} required />
			<Input register={register} id="password" disabled={loading} label="Password" errors={errors} required />
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button outline label="Continue with google" icon={FcGoogle} onClick={() => signIn('google')} />
			<Button outline label="Continue with github" icon={AiFillGithub} onClick={() => signIn('github')} />
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="justify-center text-center flex flex-row items-center gap-2">
					<div>Already have an account?</div>
					<div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
						Login
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={loading}
			isOpen={registerModal.isOpen}
			actionLabel="Register"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
