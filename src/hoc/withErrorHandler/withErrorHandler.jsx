import React, { Component } from 'react';
import axios from '../../api/axios'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/react"
import Loader from '../../Components/Cards/Loader';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null,
            isOpen: false,
            title: null,
            loading:false,
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null, loading:true });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({loading:false})
                if (error.message === "Network Error")
                    this.setState({ error: "Unable to connect to the sever. Please try again later", isOpen: true, title: "Network Error" })
                else { this.setState({ error: error.response.data.message, isOpen: true, title: error.response.statusText }); }
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null, isOpen: false, title: null });
        }

        render() {
            return (
                <div>
                    {/* {this.state.loading && <Loader/>} */}
                    
                    <Modal
                        isOpen={this.state.isOpen}
                        onClose={this.errorConfirmedHandler}
                        closeOnOverlayClick={false}
                        motionPreset="slideInBottom">
                        <ModalOverlay />
                        <ModalContent>
                            <Alert
                                status="error"
                                variant="subtle"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                minHeight="200px"
                                textAlign="center">
                                <AlertIcon boxSize="30px" mr={0} />
                                <AlertTitle mt={3} mb={3} fontSize="lg">{this.state.title}</AlertTitle>
                                <AlertDescription maxWidth="m">
                                    {this.state.error ? this.state.error : null}
                                </AlertDescription>
                            </Alert>
                            <ModalCloseButton/>
                        </ModalContent>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </div>

            );
        }
    }
}

export default withErrorHandler;